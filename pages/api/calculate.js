const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const handler = async (req, res) => {
  let { url } = req.body

  try {

    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests'], port: chrome.port};
    const runnerResult = await lighthouse(url, options);

    res.status(200).json({
      url: runnerResult.lhr.finalUrl,
      score: runnerResult.lhr.categories.performance.score * 100,
      results: runnerResult.lhr.categories,
      audits: runnerResult.lhr.audits
    })

    await chrome.kill();

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
