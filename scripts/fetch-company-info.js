#!/usr/bin/env node
/**
 * 抓取各子公司官网的产品信息和图片
 * 使用方法：node scripts/fetch-company-info.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 公司列表
const companies = [
  { id: 'baxin', name: '秉信包装', url: 'https://www.bxpackaging.com/' },
  { id: 'tingzheng', name: '顶正包材', url: 'https://www.tingzheng.com.cn/' },
  { id: 'hesheng', name: '和昇塑料', url: 'https://www.hs-plastic.net/' },
  { id: 'prostar', name: '普罗星淀粉', url: 'https://www.starpro.com.cn/' },
  { id: 'tingzhi', name: '顶志食品', url: 'https://www.tingzhisesame.com/' },
  { id: 'weizhen', name: '味珍食品', url: 'https://www.weizhenfd.com/' },
  { id: 'starpro', name: '泰国普罗星', url: 'https://starpro.co.th/' },
  { id: 'tingtong', name: '顶通物流', url: 'https://www.tingtong.com.cn/' }
];

// 创建输出目录
const outputDir = path.join(__dirname, '..', 'public', 'images', 'company-products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// HTTP GET 请求
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate'
      },
      rejectUnauthorized: false
    };

    const req = client.get(url, options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks);
        // 处理 gzip 压缩
        if (res.headers['content-encoding'] === 'gzip') {
          zlib.gunzip(body, (err, decoded) => {
            if (err) {
              resolve({
                status: res.statusCode,
                headers: res.headers,
                body: body.toString('utf8')
              });
            } else {
              resolve({
                status: res.statusCode,
                headers: res.headers,
                body: decoded.toString('utf8')
              });
            }
          });
        } else {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body.toString('utf8')
          });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// 下载图片
async function downloadImage(imageUrl, savePath) {
  try {
    const client = imageUrl.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
      const req = client.get(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        rejectUnauthorized: false
      }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(savePath, buffer);
          resolve(savePath);
        });
      });

      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Download timeout'));
      });
    });
  } catch (error) {
    console.error(`下载图片失败 ${imageUrl}: ${error.message}`);
    return null;
  }
}

// 提取 HTML 中的文本内容
function extractText(html) {
  // 移除 script 和 style
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // 移除 HTML 标签
  html = html.replace(/<[^>]+>/g, ' ');
  // 清理空白
  html = html.replace(/\s+/g, ' ').trim();
  return html;
}

// 提取图片 URL
function extractImageUrls(html, baseUrl) {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];
    if (imgUrl.startsWith('//')) {
      imgUrl = 'https:' + imgUrl;
    } else if (imgUrl.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      imgUrl = urlObj.protocol + '//' + urlObj.host + imgUrl;
    } else if (!imgUrl.startsWith('http')) {
      continue;
    }
    images.push(imgUrl);
  }

  return images;
}

// 抓取单个公司官网
async function fetchCompany(company) {
  console.log(`\n正在抓取：${company.name} (${company.url})`);

  try {
    const result = await fetchUrl(company.url);
    console.log(`  状态码：${result.status}`);

    // 保存 HTML
    const htmlPath = path.join(outputDir, `${company.id}-page.html`);
    fs.writeFileSync(htmlPath, result.body, 'utf-8');
    console.log(`  HTML 已保存到：${htmlPath}`);

    // 提取并保存图片
    const images = extractImageUrls(result.body, company.url);
    console.log(`  找到 ${images.length} 张图片`);

    const savedImages = [];
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const imgUrl = images[i];
      const imgName = `${company.id}-img-${i + 1}.jpg`;
      const savePath = path.join(outputDir, imgName);

      try {
        await downloadImage(imgUrl, savePath);
        savedImages.push({
          original: imgUrl,
          saved: imgName
        });
        console.log(`    已下载：${imgName}`);
      } catch (error) {
        console.log(`    下载失败：${imgUrl.substring(0, 80)}...`);
      }
    }

    // 提取文本简介
    const text = extractText(result.body).substring(0, 2000);

    return {
      id: company.id,
      name: company.name,
      url: company.url,
      status: result.status,
      textPreview: text,
      images: savedImages,
      htmlFile: htmlPath
    };

  } catch (error) {
    console.error(`  抓取失败：${error.message}`);
    return {
      id: company.id,
      name: company.name,
      url: company.url,
      error: error.message
    };
  }
}

// 生成 JSON 报告
function generateReport(results) {
  const report = {
    generatedAt: new Date().toISOString(),
    companies: results.map(r => ({
      id: r.id,
      name: r.name,
      url: r.url,
      status: r.status || 'error',
      imageCount: r.images ? r.images.length : 0,
      images: r.images || [],
      error: r.error || null
    }))
  };

  const reportPath = path.join(outputDir, 'company-info.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n报告已保存到：${reportPath}`);

  return report;
}

// 主函数
async function main() {
  console.log('=== 抓取子公司官网产品信息 ===\n');

  const results = [];

  for (const company of companies) {
    const result = await fetchCompany(company);
    results.push(result);
    // 等待 2 秒避免请求过快
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 生成报告
  generateReport(results);

  // 打印摘要
  console.log('\n=== 抓取完成 ===');
  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.name}: ${r.error}`);
    } else {
      console.log(`✅ ${r.name}: ${r.images.length} 张图片`);
    }
  });
}

main().catch(console.error);
