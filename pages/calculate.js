import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import Accordion from '../components/Accordion'

import post from '../js/post'
import get from '../js/get'
import displayValue from '../js/displayValue'
import intensityFactor from '../js/intensityFactor'
import recommendations from '../public/recommendations'
import ReactMarkdown from 'react-markdown'
import {
  CARBON_PER_KB,
  TREE_EMISSON_PER_YEAR,
  CARBON_PER_PAGE_LOAD_ON_DEVICE,
  AVG_LCP_TIME,
  OVERALL_LIGHTHOUSE_SCORE_EFFECT,
  US_AVG_CARBON_INTENSITY
} from '../data/variables.json'

import { useState, useEffect } from 'react'
import { Button, Text, Container, Card, Row, Spacer, Collapse, Navbar, Dropdown, Avatar, Input } from '@nextui-org/react';

export default function Home() {
  const [url, setUrl] = useState("");
  const [pageView, setPageView] = useState(10000);
  const [ratio, setRatio] = useState(40);
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState({});
  const [pageSize, setPageSize] = useState({});
  const [footPrint, setFootPrint] = useState({});
  const [hostData, setHostData] = useState(null);
  const [intensityFactorMultip, setIntensityFactorMultip] = useState(1);
  const [lcpMultip, setLcpMultip] = useState(1);
  const [lcpTime, setLcpTime] = useState(AVG_LCP_TIME);

  let calculate = async () => {
    setCalculating(true);
    setHostData(null);
    setResults({});
    setFootPrint({});
    fetchHostData();

    const env = process.env.NODE_ENV
    let calculation
    if(env == "development" && url == ""){
      calculation = await get("/test.json");
    }else{
      let urlToCalculate = url;
      if(!urlToCalculate.includes("http")){
        urlToCalculate = "https://"+urlToCalculate;
      }
      calculation = await post("/api/calculate", {url: urlToCalculate})
    }

    let pageSizeInKb = calculatePageSize(calculation.audits["network-requests"].details.items);
    setPageSize(pageSizeInKb);
    setResults(calculation);

    setLcpMultip(calculation.audits["largest-contentful-paint"].score)
    setLcpTime(calculation.audits["largest-contentful-paint"].displayValue);

    let calculatedFootPrint = calculateCarbonFootPrint(pageSizeInKb, calculation.score);
    setFootPrint(calculatedFootPrint);
    console.log("footPrint", calculatedFootPrint);
    setCalculating(false);
  }

  let fetchHostData = async () => {
    let urlToCalculate = url;
    if(!urlToCalculate.includes("http")){
      urlToCalculate = "https://"+urlToCalculate;
    }
    let fetchedHostData = await post("/api/location", {url: urlToCalculate});
    setHostData(fetchedHostData);

    setIntensityFactorMultip(intensityFactor(fetchedHostData.country, US_AVG_CARBON_INTENSITY));
  }

  let calculatePageSize = (items) => {
    let totalInByte = 0;
    let totalInByteWithoutStatic = 0;
    items.forEach((item, i) => {
      if(item.finished){
        totalInByte += item.transferSize;
        if(item.resourceType == "Document" || item.resourceType == "Script" || item.resourceType == "Other"){
          totalInByteWithoutStatic += item.transferSize;
        }
      }
    });

    return {firstVisit: totalInByte / 1000, returningVisit: totalInByteWithoutStatic / 1000};
  }

  let calculateCarbonFootPrint = (pageSizeInKb, performanceScore) => {
    let performancePunishment = 1 + (1-performanceScore/100) / OVERALL_LIGHTHOUSE_SCORE_EFFECT;
    console.log("performancePunishment", performancePunishment);
    let firstVisitImpactKb = pageSizeInKb.firstVisit * performancePunishment;
    let returningVisitImpactKb = pageSizeInKb.returningVisit * performancePunishment;


    let firstVisitCarbon = firstVisitImpactKb * CARBON_PER_KB;
    let returningVisitCarbon = returningVisitImpactKb * CARBON_PER_KB;
    let totalImpactInCarbon = firstVisitCarbon * pageView*12 * ratio + returningVisitCarbon * pageView*12 * (100 - ratio);
    let pageLoadImpactInCarbon = pageView*12 * lcpMultip * CARBON_PER_PAGE_LOAD_ON_DEVICE;

    return {
      sizeInKb: {firstVisit: pageSizeInKb.firstVisit, returningVisit: pageSizeInKb.returningVisit},
      impactInKb: {firstVisit: firstVisitImpactKb, returningVisit: returningVisitImpactKb},
      impactInCarbon: {firstVisit: firstVisitCarbon, returningVisit: returningVisitCarbon},
      totalImpactInCarbon: totalImpactInCarbon,
      treeToOffset: totalImpactInCarbon * intensityFactorMultip / TREE_EMISSON_PER_YEAR + pageLoadImpactInCarbon / TREE_EMISSON_PER_YEAR,
    };
  }

  let renderStatus = (score) => {
    if(score == 1){
      return <span className="indicator">Perfect</span>;
    }else if(score > 0.5){
      return <span className="indicator" style={{backgroundColor: "#9d8a04"}}>Needs Work</span>;
    }else{
      return <span className="indicator" style={{backgroundColor: "#a51c1c"}}>Poor</span>;
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Calculate - Carbon Neutral Website</title>
        <meta name="description" content="Carbon Neutral Website is a carbon emission calculator that will take into account the power consumption of the devices used to access web pages and web servers, as well as the carbon footprint of the internet infrastructure." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Container sm>
        <div className="calculatorHolder">
          <Input labelLeft="https://" size="lg" label="Page URL" placeholder="www.site.com" type="text" onChange={(e) => setUrl(e.target.value)} className="calculatorURL"/>
          <div style={{width: 20, height: 20}}></div>
          <Input size="lg" label="Monthly Pageviews" placeholder="10000" type="number" value={pageView} onChange={(e) => setPageView(e.target.value)} style={{minWidth: 140}}/>
          <div style={{width: 20, height: 20}}></div>
          <div className="calculatorSlider">
            <label className="nextui-c-hzQjrs nextui-input-block-label" for="react-aria-222" id="react-aria-222" style={{marginTop: 5}}>New Pageview Ratio</label>
            <input className="slider" type="range" value={ratio} min="1" max="100" onChange={(e) => setRatio(e.target.value)}/>
            <div className="slideRatio">{ratio}%</div>
          </div>
          <div style={{width: 20}}></div>
          <div>
            <label className="nextui-c-hzQjrs nextui-input-block-label" for="react-aria-222" id="react-aria-222" style={{marginTop: 5}}>&nbsp;</label>
            <Button size="lg" style={{height: 43, width: "100%"}} onClick={() => calculate()} color="gradient" auto>Calculate</Button>
          </div>
          {calculating && <div className="calculatingCover"></div> }

        </div>

        {!footPrint.impactInCarbon &&
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 10, paddingTop: 50}}>
            <img src={"/girl.svg"} style={{width: 250, marginBottom: 30}}/>
            {calculating &&
              <div>
              <h3 style={{textAlign: "center"}}>Calculating...</h3>
              <img src="data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+DQo8c3ZnIHdpZHRoPSIzOCIgaGVpZ2h0PSIzOCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICAgIDxkZWZzPg0KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjguMDQyJSIgeTE9IjAlIiB4Mj0iNjUuNjgyJSIgeTI9IjIzLjg2NSUiIGlkPSJhIj4NCiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyMjIiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIwJSIvPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgc3RvcC1vcGFjaXR5PSIuNjMxIiBvZmZzZXQ9IjYzLjE0NiUiLz4NCiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyMjIiIG9mZnNldD0iMTAwJSIvPg0KICAgICAgICA8L2xpbmVhckdyYWRpZW50Pg0KICAgIDwvZGVmcz4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj4NCiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgaWQ9Ik92YWwtMiIgc3Ryb2tlPSJ1cmwoI2EpIiBzdHJva2Utd2lkdGg9IjQiPg0KICAgICAgICAgICAgICAgIDxhbmltYXRlVHJhbnNmb3JtDQogICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSINCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIg0KICAgICAgICAgICAgICAgICAgICBmcm9tPSIwIDE4IDE4Ig0KICAgICAgICAgICAgICAgICAgICB0bz0iMzYwIDE4IDE4Ig0KICAgICAgICAgICAgICAgICAgICBkdXI9IjAuOXMiDQogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgPC9wYXRoPg0KICAgICAgICAgICAgPGNpcmNsZSBmaWxsPSIjMjIyIiBjeD0iMzYiIGN5PSIxOCIgcj0iMSI+DQogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0NCiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIg0KICAgICAgICAgICAgICAgICAgICB0eXBlPSJyb3RhdGUiDQogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiDQogICAgICAgICAgICAgICAgICAgIHRvPSIzNjAgMTggMTgiDQogICAgICAgICAgICAgICAgICAgIGR1cj0iMC45cyINCiAgICAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICAgICAgICA8L2NpcmNsZT4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K" width="40" style={{display: "block", margin: "auto"}}/>
              </div>
            }
            {!calculating &&
              <div>
              <h3 style={{textAlign: "center"}}>Calculate and offset your web page carbon footprint</h3>
              </div>
            }
          </div>
        }


        {footPrint.impactInCarbon &&
          <div className="results">
            <div className="resultsLeft">
              <h3>Results</h3>
              <big>Performance Score: <b>{results.score} / 100</b></big>
              <p>&nbsp;</p>
              <p>FirstVisit Load Kb: {displayValue(footPrint.sizeInKb.firstVisit * 1000, "B")}</p>
              <p>ReturningVisit Load Kb: {displayValue(footPrint.sizeInKb.returningVisit * 1000, "B")}</p>
              <p></p>

              <p>FirstVisit Natural Impact Kb: {displayValue(footPrint.impactInKb.firstVisit * 1000, "B")}</p>
              <p>ReturningVisit Natural Impact Kb: {displayValue(footPrint.impactInKb.returningVisit * 1000, "B")}</p>
              <p></p>

              <p>FirstVisit Carbon Footprint: {displayValue(footPrint.impactInCarbon.firstVisit, "g")}</p>
              <p>ReturningVisit Carbon Footprint: {displayValue(footPrint.impactInCarbon.returningVisit, "g")}</p>
              <p></p>

              <p>Total Impact in Carbon: {displayValue(footPrint.totalImpactInCarbon, "g")}/yr</p>
              <p>Carbon Intensity Multiplier: <b>x{displayValue(intensityFactorMultip, "")} times</b> more than United States ({hostData.country})</p>
              <p>Total Impact in Carbon with Intensity: {displayValue(footPrint.totalImpactInCarbon * intensityFactorMultip, "g")}/yr</p>
              <p>LCP TIME: {lcpTime}</p>


              <p><big>Trees to offset: <b>{Math.ceil(footPrint.treeToOffset)} Trees</b></big></p>


              {hostData != null &&
                <div>
                  <p>{hostData.city} {hostData.country}, {hostData.countryCode}</p>
                  <p>ISP: {hostData.isp}</p>
                </div>
              }

              {results &&
                <div style={{marginTop: 30}} className="recommendationsCarrier">
                  <h3>Recommendations</h3>
                  <Collapse.Group style={{padding: 0, position: "relative", zIndex: 99}}>
                    {Object.values(results.audits).filter(a => a.score != null).filter(audit =>
                      recommendations.filter(rec => rec.id == audit.id).length == 1
                    ).sort(function(a, b) {
                        return a.score - b.score;
                    }).map((audit, i) => {
                      return (
                        <Collapse title={
                          <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <h5>{audit.title}</h5>
                            {renderStatus(audit.score)}
                          </div>
                        } key={i}>
                          <ReactMarkdown linkTarget="_blank">{audit.score != 1 ? audit.description.replace("Learn more", "Take action").replace("Learn More", "Take action") : audit.description}</ReactMarkdown>
                          <p className="carbonImpactSection"><b>Carbon Impact:</b> {recommendations.filter(rec => rec.id == audit.id)[0].carbonImpact}</p>
                        </Collapse>
                      )
                    })}
                  </Collapse.Group>
                </div>
              }

            </div>
            <div className="resultsRight" style={{paddingTop: 40}}>
              {results.audits &&
                <div style={{position: "sticky", top: 50}}>
                  <img src={"/mobile.svg"} width={200} style={{position: "absolute", top: 80, transform: "scaleX(2.23) scaleY(2.15)"}} />
                  <img src={results.audits["final-screenshot"].details.data} width={200}/>
                </div>
              }
            </div>
          </div>
        }
      </Container>
      <Footer/>
    </div>
  )
}
