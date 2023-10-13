const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const path = require('path');
const printer = require('lighthouse/lighthouse-cli/printer');
const Reporter = require('lighthouse/lighthouse-core/report/report-generator');
function generateReport(runnerResult) {
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  const filename = `lhr-report@${Y}-${M + 1 < 10 ? '0' + (M + 1) : M + 1}-${D}-${H}-${m}.html`;
  const htmlReportPath = path.join(__dirname, 'public', filename);
  const reportHtml = Reporter.generateReport(runnerResult.lhr, 'html');
  printer.write(reportHtml, 'html', htmlReportPath);
}
(async() => {
    const url = 'https://huaban.com/discovery/';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const lhr = await lighthouse(
      url,
      {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'info',
      }
    );
    generateReport(lhr)
    await browser.close();
})();