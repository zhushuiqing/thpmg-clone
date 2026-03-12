#!/usr/bin/env node
/**
 * 下载各子公司官网的产品图片
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 输出目录
const outputDir = path.join(__dirname, '..', 'public', 'images', 'company-products', 'products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 公司网站和产品图片 URL（通过人工查看官网获取）
const companiesImages = {
  baxin: [
    'https://www.bxpackaging.com/Images/Public/index/CgAGfFnwZbWAaTFZAARyJvpzne8597.jpg',
    'https://www.bxpackaging.com/TempUpload/20190722095328928.jpg',
    'https://www.bxpackaging.com/TempUpload/20190722095511191.jpg',
    'https://www.bxpackaging.com/TempUpload/20180904130426590.jpg'
  ],
  tingzheng: [
    'https://rc0.zihu.com/g1/M00/3A/92/CgAGTFeMpgCAYVc-AADpn5qWb-M242.jpg',
    'https://rc0.zihu.com/g1/M00/3A/92/CgAGTFeMpkuAEotXAACmaYKrTWM303.jpg',
    'https://rc0.zihu.com/g1/M00/6B/28/CgAGS1gWsKuAY2RwAAJLXYZmQpQ975.jpg',
    'https://rc0.zihu.com/g1/M00/68/CA/CgAGS1gPGaaAUxrJAAQMRlzWvL4840.jpg'
  ],
  hesheng: [
    'https://www.hs-plastic.net/TempUpload/20200511141440780.jpg',
    'https://www.hs-plastic.net/Images/Public/index/CgAGfFzGUtqANOXQAAPQB66IZ5k535.jpg',
    'https://www.hs-plastic.net/Images/Public/about/CgAGS1dwlbaAdMr5AABYakPYV98472.png',
    'https://www.hs-plastic.net/Images/Public/about/CgAGS1dwlr2AcyrCAADYQV093YU637.png'
  ],
  prostar: [],
  tingzhi: [
    'https://www.tingzhisesame.com/upload/image/20210518/20210518154336.jpg',
    'https://www.tingzhisesame.com/upload/image/20210518/20210518154528.jpg',
    'https://www.tingzhisesame.com/upload/image/20210518/20210518154516.jpg',
    'https://www.tingzhisesame.com/upload/image/20210408/20210408143353.jpg'
  ],
  starpro: [
    'https://starpro.co.th/storage/2019/04/about_us_img.jpg',
    'https://starpro.co.th/storage/2019/04/big_our-factory205.jpg',
    'https://starpro.co.th/storage/2019/04/big_our-factory_6942-1.jpg',
    'https://starpro.co.th/storage/2019/04/big_our-factory122215.jpg'
  ],
  weizhen: [],
  tingtong: []
};

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
          if (buffer.length < 500) {
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

// 主函数
async function main() {
  console.log('=== 下载公司产品图片 ===\n');

  const results = {};

  for (const [companyId, images] of Object.entries(companiesImages)) {
    console.log(`\n${companyId}:`);
    results[companyId] = [];

    if (images.length === 0) {
      console.log('  暂无图片 URL');
      continue;
    }

    for (let i = 0; i < images.length; i++) {
      const imgUrl = images[i];
      const imgName = `${companyId}-product-${i + 1}.jpg`;
      const savePath = path.join(outputDir, imgName);

      const downloadedPath = await downloadImage(imgUrl, savePath);
      if (downloadedPath) {
        results[companyId].push(`/images/company-products/products/${imgName}`);
        console.log(`  ✓ ${imgName}`);
      } else {
        results[companyId].push(null);
        console.log(`  ✗ ${imgName}`);
      }
    }
  }

  // 保存结果
  fs.writeFileSync(
    path.join(outputDir, '..', 'downloaded-images.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );
  console.log('\n结果已保存到 downloaded-images.json');

  // 打印统计
  console.log('\n=== 下载完成 ===');
  for (const [companyId, imgs] of Object.entries(results)) {
    const success = imgs.filter(i => i).length;
    console.log(`${companyId}: ${success}/${imgs.length} 张图片`);
  }
}

main().catch(console.error);
