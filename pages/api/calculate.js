const lighthouse = require('lighthouse-lambda-node16')

const handler = async (req, res) => {
  let { url } = req.body

  try {
    console.log("started parsing");
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests']};
    const runnerResult = await lighthouse(url, options);
    console.log("runner came to a conclusion")
    res.status(200).json({
      url: runnerResult.results.lhr.finalUrl,
      score: runnerResult.results.lhr.categories.performance.score * 100,
      results: runnerResult.results.lhr.categories,
      audits: runnerResult.results.lhr.audits
    })

    await chrome.kill();

  } catch (e) {
    //res.status(500).json({ message: e.message })
    console.log("there was an error", e);
  }
}

export default handler
