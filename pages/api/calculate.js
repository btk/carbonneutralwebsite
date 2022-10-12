//const lighthouse = require('lighthouse-lambda-node16')
const lighthouse = require('serverless-lighthouse-lk');
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
    const options = {
      extends: 'lighthouse:default',
      settings: {
        onlyCategories: ['performance'], onlyAudits: ['network-requests']
      }
    };

    const chromeFlags = lighthouse.defaultChromeFlags;
    const lighthouseFlags = lighthouse.defaultLighthouseFlags;
    console.log("chromeFlags", chromeFlags);
    console.log("lighthouseFlags", lighthouseFlags);

    const results = await lighthouse.runLighthouse("https://buraktokak.com", flags, lighthouseFlags)
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
