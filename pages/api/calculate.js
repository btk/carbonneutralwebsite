const chromium = require('chrome-aws-lambda');
const lighthouse = require('lighthouse');

const handler = async (req, res) => {
  let { url } = req.body

  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--remote-debugging-port=9222"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const options = {
        output: "json",
        preset: 'mobile',
        onlyCategories: ["performance", "seo", "accessibility", "best-practices"],
        port: 9222,
    }

    const url = 'https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event';

    const result = await lighthouse(url, options);
    console.log(`Audited ${url} in ${result.lhr.timing.total} ms.`);

    const report = JSON.parse(result.report);

    res.status(200).json({
        'url': url,
        'Performance': report['categories']['performance']['score'],
        'Accessibility': report['categories']['accessibility']['score'],
        'SEO': report['categories']['seo']['score'],
        'BestPractices': report['categories']['best-practices']['score'],
        'ErrorMessage': report['audits']['speed-index']['errorMessage']
    })

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
