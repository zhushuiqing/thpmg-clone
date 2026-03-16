#!/usr/bin/env node
/**
 * 重新抓取各子公司官网的产品图片和说明
 * 使用方法：node scripts/refetch-products.js
 * eslint-disable @typescript-eslint/no-require-imports
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 公司列表和产品数据
const companiesData = {
  baxin: {
    name: '秉信包装',
    url: 'https://www.bxpackaging.com/',
    description: '专注于向客户提供中高档瓦楞纸箱的专业包装公司，是中国布局最广、辐射范围最大的包装集团',
    products: [
      { name: '水印瓦楞纸箱', description: '采用水性油墨印刷，环保无毒，适用于食品、电子产品等普通包装' },
      { name: '预印瓦楞纸箱', description: '先印刷后裱贴，印刷精度高，适合大批量标准化包装需求' },
      { name: '胶印瓦楞纸箱', description: '胶印印刷效果精美，适用于高档礼品盒、展示盒等高端包装' },
      { name: '功能性瓦楞包装', description: '具有防潮、防静电、抗菌等特殊功能的定制化包装解决方案' }
    ]
  },
  tingzheng: {
    name: '顶正包材',
    url: 'https://www.tingzheng.com.cn/',
    description: '软包装、彩盒、食品纸质容器生产企业',
    products: [
      { name: '软包装材料', description: '食品级复合膜、铝箔袋、真空袋等高品质软包装产品' },
      { name: '精品彩盒', description: '高档礼品盒、化妆品盒、电子产品包装盒等精美彩盒' },
      { name: '食品纸质容器', description: '纸杯、纸碗、纸盒等食品级纸质包装容器，安全卫生' },
      { name: '自立袋/吸嘴袋', description: '方便实用的液体、半流体食品包装解决方案' }
    ]
  },
  hesheng: {
    name: '和昇塑料',
    url: 'https://www.hs-plastic.net/',
    description: '食品级塑料制品制造商，专业生产各类塑料包装容器',
    products: [
      { name: '塑料叉子', description: '食品级塑料餐具，适用于餐饮、外卖等行业' },
      { name: '塑料瓶盖', description: '各种规格的食品级塑料瓶盖，密封性能好' },
      { name: '塑料瓶/杯', description: 'PET、PP 等材质的塑料瓶杯，适用于饮料、食品包装' },
      { name: '塑料提把', description: '便携式塑料提手，适用于礼盒、包装箱等' }
    ]
  },
  prostar: {
    name: '普罗星淀粉',
    url: 'https://www.starpro.com.cn/',
    description: '致力于淀粉及淀粉衍生物的研发和应用创新的食品级变性淀粉厂商',
    products: [
      { name: '食品级变性淀粉', description: '应用于肉制品、乳制品、调味品等食品领域的增稠剂、稳定剂' },
      { name: '工业淀粉', description: '应用于造纸、纺织、胶粘剂等工业领域的高性能淀粉产品' },
      { name: '淀粉衍生物', description: '氧化淀粉、酯化淀粉、醚化淀粉等功能性淀粉衍生物' },
      { name: '定制淀粉解决方案', description: '根据客户产品需求定制研发专用淀粉配方' }
    ]
  },
  tingzhi: {
    name: '顶志食品',
    url: 'https://www.tingzhisesame.com/',
    description: '芝麻油和芝麻制品供应商',
    products: [
      { name: '纯正芝麻油', description: '传统工艺压榨，香气浓郁，适用于烹饪、凉拌等多种用途' },
      { name: '调味芝麻油', description: '添加花椒、辣椒等香料的调味芝麻油，风味独特' },
      { name: '熟芝麻/芝麻粉', description: '精选优质芝麻烘焙研磨，适用于烘焙、调味品等' },
      { name: '芝麻酱', description: '纯芝麻研磨制成，浓郁香醇，适用于火锅蘸料、拌面等' }
    ]
  },
  starpro: {
    name: '泰国普罗星',
    url: 'https://starpro.co.th/',
    description: '泰国食品级木薯原淀粉、变性淀粉制造商',
    products: [
      { name: '木薯原淀粉', description: '泰国优质木薯制成，高纯度、高粘度，适用于食品、造纸等行业' },
      { name: '木薯变性淀粉', description: '预糊化淀粉、交联淀粉等，具有特殊功能特性' },
      { name: '食品级木薯淀粉', description: '符合国际食品安全标准，适用于休闲食品、速冻食品等' },
      { name: '工业级木薯淀粉', description: '应用于生物降解材料、胶粘剂等工业领域' }
    ]
  },
  weizhen: {
    name: '味珍食品',
    url: 'https://www.weizhenfd.com/',
    description: '冻干食品加工企业',
    products: [
      { name: '冻干水果', description: '草莓、芒果、榴莲等热带水果冻干，保留新鲜水果的营养和风味' },
      { name: '冻干蔬菜', description: '玉米粒、胡萝卜丁、青豆等，方便储存和运输' },
      { name: '冻干肉类', description: '鸡肉丁、牛肉粒等，适用于方便食品、宠物食品等' },
      { name: '冻干即食食品', description: '冻干粥、冻干汤等即食产品，冲泡即食，便捷美味' }
    ]
  },
  tingtong: {
    name: '顶通物流',
    url: 'https://www.tingtong.com.cn/',
    description: '专业物流服务提供商',
    products: [
      { name: '仓储服务', description: '全国多地设有仓储基地，提供货物存储、分拣、配送一站式服务' },
      { name: '干线运输', description: '覆盖全国的干线运输网络，时效稳定、安全可靠' },
      { name: '城市配送', description: '城市最后一公里配送服务，快速响应客户需求' },
      { name: '供应链管理', description: '为客户提供供应链优化、库存管理、物流信息化等综合服务' }
    ]
  }
};

// 创建输出目录
const outputDir = path.join(__dirname, '..', 'public', 'images', 'company-products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 创建产品图片目录
const productsDir = path.join(outputDir, 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
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
        if (res.headers['content-encoding'] === 'gzip') {
          zlib.gunzip(body, (err, decoded) => {
            if (err) {
              resolve({ status: res.statusCode, body: body.toString('utf8') });
            } else {
              resolve({ status: res.statusCode, body: decoded.toString('utf8') });
            }
          });
        } else {
          resolve({ status: res.statusCode, body: body.toString('utf8') });
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
          // 检查图片大小，太小的可能是空白或无效图片
          if (buffer.length < 1000) {
            reject(new Error('Image too small'));
            return;
          }
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
    return null;
  }
}

// 提取图片 URL
function extractImages(html, baseUrl) {
  const imgRegex = /<img[^>]+(?:src|data-original)=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    let imgUrl = match[1];

    if (imgUrl.startsWith('data:')) continue;
    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
    else if (imgUrl.startsWith('/')) {
      try {
        const urlObj = new URL(baseUrl);
        imgUrl = urlObj.protocol + '//' + urlObj.host + imgUrl;
      } catch (e) {
        continue;
      }
    } else if (!imgUrl.startsWith('http')) {
      continue;
    }

    // 过滤掉二维码、小图标、logo
    if (imgUrl.includes('qrCode') || imgUrl.includes('ewm') ||
        imgUrl.includes('logo') || imgUrl.includes('share') ||
        imgUrl.includes('icon') || imgUrl.includes('arrow')) {
      continue;
    }

    images.push(imgUrl);
  }

  return images;
}

// 抓取单个公司
async function fetchCompany(companyId, companyData) {
  console.log(`\n正在抓取：${companyData.name} (${companyId})`);

  const result = {
    id: companyId,
    name: companyData.name,
    products: []
  };

  try {
    // 抓取首页
    const homeResult = await fetchUrl(companyData.url);
    console.log(`  首页状态码：${homeResult.status}`);

    // 提取图片
    const images = extractImages(homeResult.body, companyData.url);
    console.log(`  找到 ${images.length} 张图片`);

    // 下载前 4 张有效图片
    let downloadedCount = 0;
    for (let i = 0; i < images.length && downloadedCount < 4; i++) {
      const imgUrl = images[i];
      const imgName = `${companyId}-product-${downloadedCount + 1}.jpg`;
      const savePath = path.join(productsDir, imgName);

      const downloadedPath = await downloadImage(imgUrl, savePath);
      if (downloadedPath) {
        result.products.push({
          ...companyData.products[downloadedCount],
          image: `/images/company-products/products/${imgName}`
        });
        downloadedCount++;
        console.log(`    已下载：${imgName}`);
      }
    }

    // 如果下载的图片不足 4 张，补充占位
    while (result.products.length < 4) {
      const index = result.products.length;
      result.products.push({
        ...companyData.products[index],
        image: null
      });
    }

    return result;

  } catch (error) {
    console.error(`  抓取失败：${error.message}`);
    // 返回带占位符的结果
    return {
      id: companyId,
      name: companyData.name,
      products: companyData.products.map(p => ({ ...p, image: null }))
    };
  }
}

// 生成 JSON 文件
function generateJsonFile(results) {
  const output = {};

  results.forEach(r => {
    output[r.id] = {
      name: r.name,
      products: r.products
    };
  });

  const outputPath = path.join(outputDir, 'products-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n产品数据已保存到：${outputPath}`);

  return output;
}

// 主函数
async function main() {
  console.log('=== 重新抓取子公司官网产品信息 ===\n');

  const results = [];

  for (const [companyId, companyData] of Object.entries(companiesData)) {
    const result = await fetchCompany(companyId, companyData);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 生成 JSON
  generateJsonFile(results);

  // 打印摘要
  console.log('\n=== 抓取完成 ===');
  results.forEach(r => {
    const withImages = r.products.filter(p => p.image).length;
    console.log(`${r.name}: ${withImages}/4 张图片`);
  });
}

main().catch(console.error);
