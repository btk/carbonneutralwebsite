const lighthouse = require('lighthouse-lambda-node12')

const handler = async (req, res) => {
  //let { url } = req.body

  try {

    const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests']};
    const runnerResult = await lighthouse("https://carbonneutralwebsite.org/", options);

    res.status(200).json({
      url: runnerResult
    })

    await chrome.kill();

  } catch (e) {
    //res.status(500).json({ message: e.message })
  }
}

export default handler
