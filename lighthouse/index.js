// index.js

const createLighthouse = require('lighthouse-lambda-node12')

exports.handler = function (event, context, callback) {
  let url = event.body || "https://buraktokak.com";

  Promise.resolve()
    .then(() => createLighthouse(url, {logLevel: 'info', output: 'html', onlyCategories: ['performance'], onlyAudits: ['network-requests']}))
    .then(({ chrome, results }) => {
        // Do something with `results`
        let returnResults = {
          url: results.lhr.finalUrl,
          score: results.lhr.categories.performance.score * 100,
          results: results.lhr.categories,
          audits: results.lhr.audits
        };

        return chrome.kill().then(() => callback(null, JSON.stringify(returnResults)))
      })
      .catch((error) => {
        // Handle errors when running Lighthouse
        return chrome.kill().then(() => callback(error))
      })
    // Handle other errors
    .catch(callback)
}
