const lighthouse = require('./lib/index.js')

const handler = async (req, res) => {
  let { url } = req.body

  url = url || "http://buraktokak.com/"

  try {
    console.log("started parsing", url);
    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests']};
    const runnerResult = await lighthouse(url, options);

    res.status(200).json({
      url: runnerResult.results.lhr.finalUrl,
      score: runnerResult.results.lhr.categories.performance.score * 100,
      results: runnerResult.results.lhr.categories,
      audits: runnerResult.results.lhr.audits
    })

    //await chrome.kill();

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}

export default handler
