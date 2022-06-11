const lighthouse = require('lighthouse-lambda-node12')

const handler = async (req, res) => {
  let { url } = req.body

  try {

    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests']};
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
