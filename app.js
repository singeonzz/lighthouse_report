const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {
  URL
} = require('url');
const path = require('path');
const fs = require('fs');

function generateReport(runnerResult) {
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  const filename = `lhr-report@${Y}-${M + 1 < 10 ? '0' + (M + 1) : M + 1}-${D}-${H}-${m}.html`;
  const htmlReportPath = path.join(__dirname, 'public', filename);

  fs.writeFile(htmlReportPath, runnerResult.report, (err) => {
    if (err) {
      console.error('Failed to create file:', err);
      return;
    }
    console.log('File created successfully!');
  });

}

(async () => {
  const url = 'http://172.20.20.129:8084/test_all.html';
  const browser = await puppeteer.launch({
    // 是否运行浏览器无头模式(boolean)
    headless: false,
    // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
    devtools: false,
  });

  const lhr = await lighthouse(
    url, {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'html',
      logLevel: 'info',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        emulatedFormFactor: 'desktop',
        screenEmulation: { 
          mobile: false,
          width: 900,
          height:900,
        },
      }
    }
  );
  generateReport(lhr)

  await browser.close();
})();