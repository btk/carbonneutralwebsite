//const lighthouse = require('lighthouse-lambda-node16')
const lighthouse = require('serverless-lighthouse');
const flags = [
  '--headless',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--no-zygote',
  '--no-sandbox',
  '--single-process',
  '--hide-scrollbars'
]
const handler = async (req, res) => {
  let { url } = req.body

  try {
    console.log("started parsing");
    /*const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests'], chromeFlags: flags};
    const runnerResult = await lighthouse(url, options);*/
    const results = await lighthouse.runLighthouse(url);
    console.log("runner came to a conclusion")
    res.status(200).json({
      url: results
    })
    console.log(results);
    //await chrome.kill();

  } catch (e) {
    //res.status(500).json({ message: e.message })
    console.log("there was an error", e);
  }
}

export default handler
