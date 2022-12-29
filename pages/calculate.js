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
import VARIABLES from '../data/variables.json'

import { useState, useEffect } from 'react'
import { Button, Text, Container, Card, Row, Spacer, Collapse, Navbar, Dropdown, Avatar, Input } from '@nextui-org/react';

const {
  CARBON_PER_KB,
  TREE_EMISSON_PER_YEAR,
  CARBON_PER_PAGE_LOAD_ON_DEVICE,
  AVG_LCP_TIME,
  OVERALL_LIGHTHOUSE_SCORE_EFFECT,
  US_AVG_CARBON_INTENSITY
} = VARIABLES;

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
  const [bannerStyle, setBannerStyle] = useState("light");

  useEffect(() => {
    if(results.score){
      console.log("pv changed to", pageView, ratio);
      softCalculate();
    }
  }, [pageView, ratio])

  let softCalculate = async () => {
    setCalculating(true);
    let calculation = results;
    let pageSizeInKb = calculatePageSize(calculation.audits["network-requests"].details.items);
    setPageSize(pageSizeInKb);

    setLcpMultip(calculation.audits["largest-contentful-paint"].score)
    setLcpTime(calculation.audits["largest-contentful-paint"].displayValue);

    let calculatedFootPrint = calculateCarbonFootPrint(pageSizeInKb, calculation.score);
    setFootPrint(calculatedFootPrint);
    setCalculating(false);
  }

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

  let renderStatus100 = (score) => {
    if(score > 95){
      return <span className="indicator" style={{ height: 28, position: "relative", top: 7, left: 7}}>Perfect</span>;
    }else if(score > 50){
      return <span className="indicator" style={{backgroundColor: "#9d8a04",  height: 28, position: "relative", top: 7, left: 7}}>Needs Work</span>;
    }else{
      return <span className="indicator" style={{backgroundColor: "#a51c1c",  height: 28, position: "relative", top: 7, left: 7}}>Poor</span>;
    }
  }

  let copyText = (text) => {
    navigator.clipboard.writeText(text + ` for webpage ${url}.`);
    alert(`Text Copied!
========
${text} for webpage ${url}.
      `);
  }

  let getBannerURL = (style) => {
    let domain = url.split("/")[0];
    return `http://carbonneutralwebsite.org/api/banner/${domain}/${displayValue(footPrint.impactInCarbon.firstVisit, "g").replace(" ", "")}/${style ? style : "light"}.svg`;
  }

  let getBannerCode = (style, size) => {
    return `<!-- Carbon Neutral Website Banner (${style}) -->
<a href="https://carbonneutralwebsite.org/" target="_blank" rel="noreferrer"><img src="${getBannerURL(style)}" width="${size ? size : "300px"}"  alt="Carbon impact of this web page" /></a>`;
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
          <Input labelLeft="https://" size="lg" label="Page URL" placeholder="www.site.com" type="text" value={url} onChange={(e) => setUrl(e.target.value.replace("https://", "").replace("http://", ""))} className="calculatorURL"/>
          <div style={{width: 20, height: 20}}></div>
          <Input size="lg" label="Monthly Pageviews" placeholder="10000" type="number" value={pageView} onChange={(e) => setPageView(e.target.value)} style={{minWidth: 140}}/>
          <div style={{width: 20, height: 20}}></div>
          <div className="calculatorSlider">
            <label className="nextui-c-hzQjrs nextui-input-block-label" htmlFor="react-aria-222" id="react-aria-222" style={{marginTop: 5}}>New Pageview Ratio</label>
            <input className="slider" type="range" value={ratio} min="1" max="100" onChange={(e) => setRatio(e.target.value)}/>
            <div className="slideRatio">{ratio}%</div>
          </div>
          <div style={{width: 20}}></div>
          <div>
            <label className="nextui-c-hzQjrs nextui-input-block-label" htmlFor="react-aria-222" id="react-aria-222" style={{marginTop: 5}}>&nbsp;</label>
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
              <h3 href="#results">Results</h3>

              <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div className="resultCol">
                  <h4>Total Carbon Impact</h4>
                  <p>{displayValue(footPrint.totalImpactInCarbon * intensityFactorMultip, "g")}</p>
                  <span>Per Year</span>
                  <div className="copyButton" onClick={() => copyText(`Total Carbon Impact is ${displayValue(footPrint.totalImpactInCarbon * intensityFactorMultip, "g")} Per Year`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>

                <div className="resultCol">
                  <h4>Performance Metric Score</h4>
                  <div style={{display: "flex", flexDirection: "row"}}><p>{results.score}</p> {renderStatus100(results.score)}</div>
                  <span>Out of 100</span>

                  <div className="copyButton" onClick={() => copyText(`Performance Metric Score is ${results.score} Out of 100`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>
              </div>

              <div className="resultCol" style={{marginRight: 0}}>
                {hostData != null &&
                  <div>
                    <h4>Server Location</h4>
                    <p style={{fontSize: 20}}>{hostData.city} {hostData.country}, {hostData.countryCode} {hostData.countryCode != "US" && <b style={{textAlign: "right", width: "100%"}}>(x{displayValue(intensityFactorMultip, "")} more emission than US)</b>}</p>
                    <span>ISP: {hostData.isp}</span>
                  </div>
                }

                <div className="copyButton" onClick={() => copyText(`Server Location is ${hostData.city}, ${hostData.country} ${hostData.isp}`)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>


              <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div className="resultCol">
                  <h4>First Visit Load Size</h4>
                  <p>{displayValue(footPrint.sizeInKb.firstVisit * 1000, "B")}</p>
                  <span>Per page load</span>

                  <div className="copyButton" onClick={() => copyText(`First Visit Load Size is ${displayValue(footPrint.sizeInKb.firstVisit * 1000, "B")} Per page load`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>

                <div className="resultCol">
                  <h4>Returning Visit Load Size</h4>
                  <p>{displayValue(footPrint.sizeInKb.returningVisit * 1000, "B")}</p>
                  <span>Per page load</span>

                  <div className="copyButton" onClick={() => copyText(`Returning Visit Load Size is ${displayValue(footPrint.sizeInKb.returningVisit * 1000, "B")} Per page load`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>
              </div>

              <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div className="resultCol">
                  <h4>First Visit Carbon Emission</h4>
                  <p>{displayValue(footPrint.impactInCarbon.firstVisit, "g")}</p>
                  <span>Per page load</span>

                  <div className="copyButton" onClick={() => copyText(`First Visit Carbon Emission is ${displayValue(footPrint.impactInCarbon.firstVisit, "g")} Per page load`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>

                <div className="resultCol">
                  <h4>Returning Visit Carbon Emission</h4>
                  <p>{displayValue(footPrint.impactInCarbon.returningVisit, "g")}</p>
                  <span>Per page load</span>

                  <div className="copyButton" onClick={() => copyText(`Returning Visit Carbon Emission is ${displayValue(footPrint.impactInCarbon.returningVisit, "g")} Per page load`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                </div>
              </div>

              <div className="resultCol" style={{marginRight: 0}}>
                <h4>Largest Contentful Paint</h4>
                <p>{lcpTime}</p>
                <span>Avg {AVG_LCP_TIME}s</span>

                <div className="copyButton" onClick={() => copyText(`Largest Contentful Paint is ${lcpTime}`)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>


              <div className="resultCol resultTree">
                <h4>Trees to Offset Carbon Emission</h4>
                <p>{Math.ceil(footPrint.treeToOffset)} Trees</p>
                <span>Per Year</span>

                <div className="copyButton" onClick={() => copyText(`Trees to Offset Carbon Emission is ${Math.ceil(footPrint.treeToOffset)} Trees Per Year`)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>

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


              <div className="bannerCode">
                <h4>Fancy a banner for your page?</h4>
                <span>Put your calculation results on your web page and show your users their carbon impact.</span>

                <div style={{height: 20}}/>
                <img src={getBannerURL(bannerStyle)} alt={"banner demo"} width={300}/>
                <div style={{height: 10}}/>

                <div style={{display: "flex", flexDirection: "row"}}>
                  <div className={bannerStyle == "light" ? "selectionActive": "selection"} onClick={() => setBannerStyle("light")}>Light Banner</div>
                  <div className={bannerStyle == "dark" ? "selectionActive": "selection"} onClick={() => setBannerStyle("dark")}>Dark Banner</div>
                </div>
                <div className="textareaHolder">
                  <div className="copyButton" style={{backgroundColor: "#eee", opacity: 1}} onClick={() => copyText(getBannerCode(bannerStyle))}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span style={{marginLeft: 5, fontSize: 13, position: "relative", bottom: 3 }}>Copy Code</span>
                  </div>
                  <textarea style={{fontFamily: "monospace"}} value={getBannerCode(bannerStyle)}/>
                </div>
                <div style={{height: 10}}/>

              </div>


            </div>
            <div className="resultsRight" style={{paddingTop: 40}}>
              {results.audits &&
                <div style={{position: "sticky", top: 50}}>
                  <img src={"/mobile.svg"} width={200} style={{position: "absolute", top: 80, transform: "scaleX(2.23) scaleY(2.15)"}} />
                  <img src={results.audits["final-screenshot"].details.data} width={200}/>
                  <div style={{height: 50}}></div>
                </div>
              }
            </div>
          </div>
        }

        {results &&
          <a href="https://github.com/btk/carbonneutralwebsite/issues/new">
            <div className="resultCol">
              <h4>Do you have feedback?</h4>
              <span>This project is still in beta stage. You can give feedback and detail your problems by creating a new issue in this Github repository.</span>
            </div>
          </a>
        }

      </Container>
      <Footer/>
    </div>
  )
}
