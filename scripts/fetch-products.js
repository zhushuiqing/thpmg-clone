#!/usr/bin/env node
/**
 * 抓取各子公司官网的产品信息和图片
 * 使用方法：node scripts/fetch-products.js
 * eslint-disable @typescript-eslint/no-require-imports
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 公司列表
const companies = [
  { id: 'baxin', name: '秉信包装', url: 'https://www.bxpackaging.com/', productUrl: 'https://www.bxpackaging.com/prod.aspx?TypeId=10&FId=t3:10:3' },
  { id: 'tingzheng', name: '顶正包材', url: 'https://www.tingzheng.com.cn/', productUrl: null },
  { id: 'hesheng', name: '和昇塑料', url: 'https://www.hs-plastic.net/', productUrl: 'https://www.hs-plastic.net/pro.aspx?FId=n3:3:3' },
  { id: 'prostar', name: '普罗星淀粉', url: 'https://www.starpro.com.cn/', productUrl: null },
  { id: 'tingzhi', name: '顶志食品', url: 'https://www.tingzhisesame.com/', productUrl: 'https://www.tingzhisesame.com/pro_list.aspx?FId=n3:3:3' },
  { id: 'starpro', name: '泰国普罗星', url: 'https://starpro.co.th/', productUrl: null },
  { id: 'weizhen', name: '味珍食品', url: 'https://www.weizhenfd.com/', productUrl: null },
  { id: 'tingtong', name: '顶通物流', url: 'https://www.tingtong.com.cn/', productUrl: null }
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
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Referer': url
      },
      rejectUnauthorized: false,
      timeout: 20000
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
    req.setTimeout(20000, () => {
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
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Referer': imageUrl
        },
        rejectUnauthorized: false,
        timeout: 15000
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
      req.setTimeout(15000, () => {
        req.destroy();
        reject(new Error('Download timeout'));
      });
    });
  } catch (error) {
    console.error(`下载图片失败 ${imageUrl}: ${error.message}`);
    return null;
  }
}

// 提取产品图片 URL - 针对秉信包装
function extractBaxinProducts(html, baseUrl) {
  const products = [];

  // 匹配产品列表
  const prodRegex = /prod_view\.aspx\?TypeId=(\d+)&Id=(\d+)&FId=t3:\d+:3"[^>]*>\s*<img[^>]+data-original=['"]([^'"]+)['"]/gi;
  let match;

  while ((match = prodRegex.exec(html)) !== null) {
    const typeId = match[1];
    const id = match[2];
    let imgUrl = match[3];

    if (imgUrl.startsWith('/')) {
      imgUrl = baseUrl + imgUrl;
    }

    products.push({
      typeId,
      id,
      imageUrl: imgUrl
    });
  }

  return products;
}

// 提取和昇塑料产品
function extractHeshengProducts(html, baseUrl) {
  const products = [];

  // 匹配产品项
  const prodRegex = /products\.aspx\?TypeId=(\d+)[^']*'[^>]*>\s*<img[^>]+data-original=['"]([^'"]+)['"]/gi;
  let match;

  while ((match = prodRegex.exec(html)) !== null) {
    const typeId = match[1];
    let imgUrl = match[2];

    if (imgUrl.startsWith('/')) {
      imgUrl = baseUrl + imgUrl;
    }

    products.push({
      typeId,
      imageUrl: imgUrl
    });
  }

  return products;
}

// 提取顶志食品产品
function extractTingzhiProducts(html, baseUrl) {
  const products = [];

  // 匹配产品图片
  const imgRegex = /<img[^>]+src=['"]([^'"]+\.jpg[^'"]*)['"][^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];

    if (imgUrl.startsWith('/')) {
      imgUrl = baseUrl + imgUrl;
    } else if (!imgUrl.startsWith('http')) {
      continue;
    }

    // 过滤掉二维码和 logo
    if (imgUrl.includes('ewm') || imgUrl.includes('logo') || imgUrl.includes('sy_')) {
      continue;
    }

    products.push({
      imageUrl: imgUrl
    });
  }

  return products;
}

// 抓取单个公司
async function fetchCompany(company) {
  console.log(`\n正在抓取：${company.name} (${company.url})`);

  const result = {
    id: company.id,
    name: company.name,
    url: company.url,
    products: []
  };

  try {
    // 抓取首页
    const homeResult = await fetchUrl(company.url);
    console.log(`  首页状态码：${homeResult.status}`);

    // 保存 HTML 供分析
    const htmlPath = path.join(outputDir, `${company.id}-page.html`);
    fs.writeFileSync(htmlPath, homeResult.body, 'utf-8');
    console.log(`  HTML 已保存到：${htmlPath}`);

    // 如果有产品页面，抓取产品页面
    if (company.productUrl) {
      try {
        const prodResult = await fetchUrl(company.productUrl);
        console.log(`  产品页面状态码：${prodResult.status}`);

        const prodHtmlPath = path.join(outputDir, `${company.id}-products.html`);
        fs.writeFileSync(prodHtmlPath, prodResult.body, 'utf-8');
        console.log(`  产品 HTML 已保存到：${prodHtmlPath}`);

        // 根据不同类型的公司提取产品
        let extractedProducts = [];
        if (company.id === 'baxin') {
          extractedProducts = extractBaxinProducts(prodResult.body, company.url);
        } else if (company.id === 'hesheng') {
          extractedProducts = extractHeshengProducts(prodResult.body, company.url);
        } else if (company.id === 'tingzhi') {
          extractedProducts = extractTingzhiProducts(prodResult.body, company.url);
        }

        console.log(`  提取到 ${extractedProducts.length} 个产品`);

        // 下载产品图片
        for (let i = 0; i < extractedProducts.length; i++) {
          const prod = extractedProducts[i];
          const imgName = `${company.id}-product-${i + 1}.jpg`;
          const savePath = path.join(outputDir, imgName);

          try {
            await downloadImage(prod.imageUrl, savePath);
            result.products.push({
              name: `产品${i + 1}`,
              image: `/images/company-products/${imgName}`,
              originalUrl: prod.imageUrl
            });
            console.log(`    已下载：${imgName}`);
          } catch (error) {
            console.log(`    下载失败：${prod.imageUrl.substring(0, 80)}...`);
          }
        }
      } catch (error) {
        console.log(`  产品页面抓取失败：${error.message}`);
      }
    }

    // 从首页提取图片
    const homeImages = extractImages(homeResult.body, company.url);
    console.log(`  首页找到 ${homeImages.length} 张图片`);

    // 下载首页重要图片
    for (let i = 0; i < Math.min(homeImages.length, 10); i++) {
      const imgUrl = homeImages[i];
      const imgName = `${company.id}-img-${i + 1}.jpg`;
      const savePath = path.join(outputDir, imgName);

      try {
        await downloadImage(imgUrl, savePath);
        result.products.push({
          name: `图片${i + 1}`,
          image: `/images/company-products/${imgName}`,
          originalUrl: imgUrl
        });
        console.log(`    已下载首页图片：${imgName}`);
      } catch (error) {
        console.log(`    首页图片下载失败：${imgUrl.substring(0, 80)}...`);
      }
    }

    return result;

  } catch (error) {
    console.error(`  抓取失败：${error.message}`);
    return {
      id: company.id,
      name: company.name,
      url: company.url,
      error: error.message,
      products: []
    };
  }
}

// 提取图片 URL
function extractImages(html, baseUrl) {
  const imgRegex = /<img[^>]+(?:src|data-original)=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];

    // 跳过 data:image (base64)
    if (imgUrl.startsWith('data:')) {
      continue;
    }

    if (imgUrl.startsWith('//')) {
      imgUrl = 'https:' + imgUrl;
    } else if (imgUrl.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      imgUrl = urlObj.protocol + '//' + urlObj.host + imgUrl;
    } else if (!imgUrl.startsWith('http')) {
      continue;
    }

    // 过滤掉二维码和小图标
    if (imgUrl.includes('qrCode') || imgUrl.includes('ewm')) {
      continue;
    }

    images.push(imgUrl);
  }

  return images;
}

// 生成 JSON 报告
function generateReport(results) {
  const report = {
    generatedAt: new Date().toISOString(),
    companies: results.map(r => ({
      id: r.id,
      name: r.name,
      url: r.url,
      productCount: r.products ? r.products.length : 0,
      products: r.products || [],
      error: r.error || null
    }))
  };

  const reportPath = path.join(outputDir, 'products.json');
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
    // 等待 3 秒避免请求过快
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // 生成报告
  generateReport(results);

  // 打印摘要
  console.log('\n=== 抓取完成 ===');
  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.name}: ${r.error}`);
    } else {
      console.log(`✅ ${r.name}: ${r.products.length} 张图片`);
    }
  });
}

main().catch(console.error);
