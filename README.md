# Carbon Neutral Website

[Carbon Neutral Website](https://carbonneutralwebsite.org) is a carbon emission calculator that will take into account the power consumption of the devices used to access web pages and web servers, as well as the carbon footprint of the internet infrastructure. This calculator will also tell you the amount of trees you should plant to offset your website's carbon footprint.

<img src="public/social.png" width="100" height="100">

## Function Instances

You need to deploy `/lighthouse` on AWS Lambda, and then change the `LIGHTHOUSE_LAMBDA_URI` environment variable to the public function instance URI.

[See how in AWS docs](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Data References

- [parsers/data/carbon-intensity.csv](https://ourworldindata.org/grapher/carbon-intensity-electricity) is supplied from ourworldindata.org, which is based on [bp statistical review of world energy 2022, 71st edition](https://www.bp.com/content/dam/bp/business-sites/en/global/corporate/pdfs/energy-economics/statistical-review/bp-stats-review-2022-full-report.pdf)
- [data/variables.json](/data/variables.json) contains static calculation variables used in the calculator tool

Variable metrics;
```
CARBON_PER_KB // g
TREE_EMISSON_PER_YEAR // g
CARBON_PER_PAGE_LOAD_ON_DEVICE // g
AVG_LCP_TIME // s
OVERALL_LIGHTHOUSE_SCORE_EFFECT // out of 100
US_AVG_CARBON_INTENSITY // gCO2/kWh
```

## Feedback

This project is still in beta stage. You can give feedback and detail your problems by [creating a new issue](https://github.com/btk/carbonneutralwebsite/issues) in this Github repository.
