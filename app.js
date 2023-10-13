const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const path = require('path');
const fs = require('fs');

function generateReport(runnerResult) {
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  const filename = `lhr-report@${Y}-${M + 1 < 10 ? '0' + (M + 1) : M + 1}-${D}-${H}-${m}.json`;
  const htmlReportPath = path.join(__dirname, 'public', filename);

  // 新建一个文件
  fs.writeFile(htmlReportPath, runnerResult.report, (err) => {
    if (err) {
      console.error('Failed to create file:', err);
      return;
    }
    console.log('File created successfully!');
  });

}
(async() => {
    const url = 'https://huaban.com/discovery/';
    const browser = await puppeteer.launch({
    // 是否运行浏览器无头模式(boolean)
    headless: false,
    // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
    devtools: true,
  });
  try {
    const lhr = await lighthouse(
      url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'info',
      }
    );
    generateReport(lhr)
  } catch {}

  await browser.close();
})();