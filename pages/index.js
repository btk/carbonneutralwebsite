import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import post from '../js/post'
import { useState, useEffect } from 'react'

const CARBON_PER_KB = 0.00082;

export default function Home() {
  const [url, setUrl] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState({});
  const [pageSize, setPageSize] = useState({});
  const [footPrint, setFootPrint] = useState({});

  let calculate = async () => {
    setCalculating(true);
    let calculation = await post("/api/calculate", {url})
    console.log(calculation);

    let pageSizeInKb = calculatePageSize(calculation.audits["network-requests"].details.items);
    console.log(pageSizeInKb);
    setPageSize(pageSizeInKb);
    setResults(calculation);

    let calculatedFootPrint = calculateCarbonFootPrint(pageSizeInKb, calculation.score);
    setFootPrint(calculatedFootPrint);
    console.log("footPrint", calculatedFootPrint);
    setCalculating(false);
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
    let performancePunishment = 1 + (1-performanceScore/100);
    console.log("performancePunishment", performancePunishment);
    let firstVisitImpactKb = pageSizeInKb.firstVisit * performancePunishment;
    let returningVisitImpactKb = pageSizeInKb.returningVisit * performancePunishment;


    let firstVisitCarbon = firstVisitImpactKb * CARBON_PER_KB;
    let returningVisitCarbon = returningVisitImpactKb * CARBON_PER_KB;

    return {
      sizeInKb: {firstVisit: pageSizeInKb.returningVisit, returningVisit: pageSizeInKb.returningVisit},
      impactInKb: {firstVisit: firstVisitImpactKb, returningVisit: returningVisitImpactKb},
      impactInCarbon: {firstVisit: firstVisitCarbon, returningVisit: returningVisitCarbon},
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Carbon Neutral Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Header/>
          <h2>Calculate Your Website{`'`}s<br/>
          Carbon Footprint</h2>
          <input type="text" onChange={(e) => setUrl(e.target.value)}/>
          {!calculating && <div onClick={() => calculate()}>Calculate</div>}
          {calculating && <div>Calculating...</div>}
          {footPrint.impactInCarbon &&
            <div>
              <p>Performance Score: {results.score} / 100</p>
              <p></p>
              <p>FirstVisit Load Kb: {footPrint.sizeInKb.firstVisit} kB</p>
              <p>ReturningVisit Load Kb: {footPrint.sizeInKb.returningVisit} kB</p>
              <p></p>

              <p>FirstVisit Natural Impact Kb: {footPrint.impactInKb.firstVisit} kB</p>
              <p>ReturningVisit Natural Impact Kb: {footPrint.impactInKb.returningVisit} kB</p>
              <p></p>

              <p>FirstVisit Carbon Footprint: {footPrint.impactInCarbon.firstVisit} g</p>
              <p>ReturningVisit Carbon Footprint: {footPrint.impactInCarbon.returningVisit} g</p>
            </div>
          }
        </div>
      </div>
      <div className="content">
        <p>Work In Progress</p>
      </div>
    </div>
  )
}
