import carbonIntensity from '../data/carbon-intensity';

export default function intensityFactor (countryName, avgCarbonIntensity) {
    let countryObjects = carbonIntensity.filter(country => {
      return country.name.toLowerCase().includes(countryName.toLowerCase());
    });

    if(countryObjects.length > 0){
      return countryObjects[0].intensity / avgCarbonIntensity;
    }else {
      return 1; // Just multiply with one, dont factor in anything
    }
}
