const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {
  URL
} = require('url');
const path = require('path');
const fs = require('fs');

function generateReport(runnerResult, name) {
  const now = new Date();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  const filename = `${name}_report@${M + 1 < 10 ? '0' + (M + 1) : M + 1}_${D}_${H}_${m}.html`;
  const htmlReportPath = path.join(__dirname, 'public', filename);

  // 读写文件
  fs.writeFile(htmlReportPath, runnerResult.report, (err) => {
    if (err) {
      console.error('Failed to create file:', err);
      return;
    }
    console.log('File created successfully!');
  });

}

(async () => {

  const testUrl = {
    galaxyVisV1: 'http://172.20.20.129:8084/test_all.html'
  }

  for (let name in testUrl) {
    const url = testUrl[name];
    const browser = await puppeteer.launch({
      // 是否运行浏览器无头模式(boolean)
      headless: false,
    });

    const lhr = await lighthouse(
      url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'html',
        logLevel: 'info',
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40, // 往返时间 (RTT) 模拟延迟（毫秒）
          throughputKbps: 10240, // 带宽限制 (kbps)
          cpuSlowdownMultiplier: 1, // CPU 慢速下降倍数
        },
        onlyCategories: ['performance'],
      }, {
        extends: 'lighthouse:default',
        settings: {
          locale: 'zh',
          formFactor: 'desktop',
          emulatedFormFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 900,
            height: 900,
          },
        }
      }
    );
    generateReport(lhr, name)

    await browser.close();
  }

})();