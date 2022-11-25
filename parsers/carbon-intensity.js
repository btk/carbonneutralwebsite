var fs = require("fs");

let countryArray = [];

fs.readFile("./data/carbon-intensity-electricity.csv", 'utf8', (err, data) => {
  let lines = data.split("\n");
  lines.forEach(line => {
    if(line.includes(",2020,")){
      let country = line.split(",");
      let countryObject = {};
      countryObject.name = country[0];
      countryObject.code = country[1];
      countryObject.intensity = Number(country[3]);
      countryArray.push(countryObject);
    }
  })
});

setTimeout(() => {
  let data = JSON.stringify(countryArray, null, 2);
  console.log(data);
  fs.writeFileSync('../data/carbon-intensity.json', data);
}, 5000);
