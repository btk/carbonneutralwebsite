let serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

async function get(url = '', params = {}, mode) {
  let serialized = serialize(params);
  // Default options are marked with *
  const response = await fetch(url+"?"+serialized, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: mode ? mode : 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const handler = async (req, res) => {
  let { url } = req.body

  url = url || "http://apple.com/";
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];

  try {
    let results = await get(`http://ip-api.com/json/${domain}`);
    res.status(200).json(results)

    //await chrome.kill();

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message })
  }
}

export default handler
