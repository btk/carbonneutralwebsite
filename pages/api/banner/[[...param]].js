export default async function handler(req, res) {
  const {
    query: { param },
    method
  } = req

  let [url, carbon] = param;
    carbon = carbon.replace(".svg", "");

    res.setHeader('Cache-Control', `s-maxage=${60 * 60 * 24 * 30}, stale-while-revalidate`);
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
    });

    const response = await fetch(`http://localhost:3000/banner.svg`);
    let body = await response.text();

    let svg = body;

    svg = svg.replace(new RegExp(`\\$domain`,"g"), url);
    svg = svg.replace(new RegExp(`\\$co2g`,"g"), carbon);

    console.log(svg);

    res.write(svg)
    res.end()
}
