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
import { useState, useEffect } from 'react'
import { Button, Text, Container, Card, Row, Spacer, Collapse, Navbar, Dropdown, Avatar, Input } from '@nextui-org/react';

const CARBON_PER_KB = 0.000845703125; // g
const TREE_EMISSON_PER_YEAR = 24000.00;// g
const CARBON_PER_PAGE_LOAD_ON_DEVICE = 0.002183706; // g
const OVERALL_LIGHTHOUSE_SCORE_EFFECT = 20; // out of 100

export default function Home() {
  const [url, setUrl] = useState("");
  const [pageView, setPageView] = useState(10000);
  const [ratio, setRatio] = useState(40);
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState({});
  const [pageSize, setPageSize] = useState({});
  const [footPrint, setFootPrint] = useState({});
  const [hostData, setHostData] = useState(null);

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
      calculation = await post("/api/calculate", {url})
    }

    let pageSizeInKb = calculatePageSize(calculation.audits["network-requests"].details.items);
    console.log(pageSizeInKb);
    setPageSize(pageSizeInKb);
    setResults(calculation);

    let calculatedFootPrint = calculateCarbonFootPrint(pageSizeInKb, calculation.score);
    setFootPrint(calculatedFootPrint);
    console.log("footPrint", calculatedFootPrint);
    setCalculating(false);
  }

  let fetchHostData = async () => {
    let fetchedHostData = await post("/api/location", {url});
    setHostData(fetchedHostData);
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
    let totalImpactInCarbon = firstVisitCarbon * pageView * ratio + returningVisitCarbon * pageView * (100 - ratio);

    return {
      sizeInKb: {firstVisit: pageSizeInKb.firstVisit, returningVisit: pageSizeInKb.returningVisit},
      impactInKb: {firstVisit: firstVisitImpactKb, returningVisit: returningVisitImpactKb},
      impactInCarbon: {firstVisit: firstVisitCarbon, returningVisit: returningVisitCarbon},
      totalImpactInCarbon: totalImpactInCarbon,
      treeToOffset: totalImpactInCarbon / TREE_EMISSON_PER_YEAR + pageView * CARBON_PER_PAGE_LOAD_ON_DEVICE / TREE_EMISSON_PER_YEAR,
    };
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
        <Spacer y={1} />
        <Input labelLeft="https://" size="lg" label="Page URL" placeholder="www.site.com" type="text" onChange={(e) => setUrl(e.target.value)}/>
        <Spacer y={0.6} />
        <Input size="lg" label="Yearly Pageview" placeholder="10000" type="number" value={pageView} onChange={(e) => setPageView(e.target.value)}/>
        <Spacer y={1.6} />
        <p>New PageView Ratio: <input type="range" value={ratio} min="1" max="100" onChange={(e) => setRatio(e.target.value)}/> {ratio}%<  /p>
        {!calculating && <Button size="lg" onClick={() => calculate()} color="gradient" auto>Calculate</Button>}
        {calculating && <div style={{color: "blue"}}>Calculating...</div>}
        {footPrint.impactInCarbon &&
          <div>
            <p>Performance Score: <b>{results.score} / 100</b></p>
            <p></p>
            <p>FirstVisit Load Kb: {footPrint.sizeInKb.firstVisit} kB</p>
            <p>ReturningVisit Load Kb: {footPrint.sizeInKb.returningVisit} kB</p>
            <p></p>

            <p>FirstVisit Natural Impact Kb: {footPrint.impactInKb.firstVisit} kB</p>
            <p>ReturningVisit Natural Impact Kb: {footPrint.impactInKb.returningVisit} kB</p>
            <p></p>

            <p>FirstVisit Carbon Footprint: {footPrint.impactInCarbon.firstVisit} g</p>
            <p>ReturningVisit Carbon Footprint: {footPrint.impactInCarbon.returningVisit} g</p>
            <p></p>

            <p>Total Impact in Carbon: {footPrint.totalImpactInCarbon / 1000} kg/yr</p>
            <p><big>Tree to offset: <b>{Math.ceil(footPrint.treeToOffset)} Trees</b></big></p>
          </div>
        }

        {hostData != null &&
          <div>
            <p>{hostData.city} {hostData.country}, {hostData.countryCode}</p>
            <p>ISP: {hostData.isp}</p>
          </div>
        }
      </Container>
      <Footer/>
    </div>
  )
}
