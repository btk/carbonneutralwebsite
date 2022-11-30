//const lighthouse = require('./lib/index.js')
async function post(url = '', address, mode) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: mode ? mode : 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: address // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const handler = async (req, res) => {
  let { url } = req.body

  url = url || "http://apple.com/";

  try {
    let results = await post(process.env.LIGHTHOUSE_LAMBDA_URI, url);
    res.status(200).json(results)

    //await chrome.kill();

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}

export default handler
