const puppeteer = require('puppeteer');
const looksSame = require('looks-same');

const URL_A = 'http://127.0.0.1:8080/a.html';
const URL_B = 'http://127.0.0.1:8080/b.html';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 100 });

  const pathA = 'dist/a.png';
  const pathB = 'dist/b.png';
  const pathDiff = 'dist/diff.png';
  await page.goto(URL_A);
  await page.screenshot({ path: pathA });
  await page.goto(URL_B);
  await page.screenshot({ path: pathB });
  
  await new Promise((resolve, reject) => {
    looksSame.createDiff(
      {
        reference: pathA,
        current: pathB,
        diff: pathDiff,
        highlightColor: '#ff00ff'
      },
      error => (error ? reject() : resolve())
    );
  });

  await browser.close();
})();