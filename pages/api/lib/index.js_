const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const lighthouse = require('lighthouse')

const defaultFlags = [
  '--headless',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--no-zygote',
  '--no-sandbox',
  '--single-process',
  '--hide-scrollbars'
]

chromePath = undefined;
console.log("process.env.AWS_EXECUTION_ENV", process.env.AWS_EXECUTION_ENV);
if (['AWS_Lambda_nodejs10.x', 'AWS_Lambda_nodejs12.x', 'AWS_Lambda_nodejs14.x', 'AWS_Lambda_nodejs16.x'].includes(process.env.AWS_EXECUTION_ENV) === true) {
  if (process.env.FONTCONFIG_PATH === undefined) {
    process.env.FONTCONFIG_PATH = '/tmp/aws';

  }

  if (process.env.LD_LIBRARY_PATH === undefined) {
    process.env.LD_LIBRARY_PATH = '/tmp/aws/lib';
  } else if (process.env.LD_LIBRARY_PATH.startsWith('/tmp/aws/lib') !== true) {
    process.env.LD_LIBRARY_PATH = [...new Set(['/tmp/aws/lib', ...process.env.LD_LIBRARY_PATH.split(':')])].join(':');
  }
}

console.log("process.env.LD_LIBRARY_PATH", process.env.LD_LIBRARY_PATH);
console.log("process.env.FONTCONFIG_PATH", process.env.FONTCONFIG_PATH);

module.exports = async function createLighthouse(url, options = {}, config) {
  options.output = options.output || 'html'
  const log = options.logLevel ? require('lighthouse-logger') : null
  if (log) {
    log.setLevel(options.logLevel)
  }
  const chromeFlags = options.chromeFlags || defaultFlags
  if (!chromePath) { chromePath = await chromium.executablePath }
  if(!chromePath) {
    chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  }
  console.log("chromePath", chromePath);

  options.args = chromeFlags;
  options.executablePath = chromePath;
  options.headless = chromium.headless;

  const browser = await puppeteer.launch(options);
  const { port } = new URL(browser.wsEndpoint());

  console.log("browser.port", port);
  options.port = port;

  const results = await lighthouse(url, options, config)

  return {
    log,
    results
  }
}
