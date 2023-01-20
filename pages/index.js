import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import Accordion from '../components/Accordion'
import ScrollDown from '../components/ScrollDown'

import post from '../js/post'
import get from '../js/get'
import { useState, useEffect } from 'react'
import { Button, Text, Container, Card, Row, Spacer, Collapse, Navbar, Dropdown, Avatar, Input } from '@nextui-org/react';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Carbon Neutral Website - Web Page Carbon Emission Calculator</title>
        <meta name="description" content="Carbon Neutral Website is a carbon emission calculator that takes into account the power consumption of device and server during browsing a web page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header noSpacing={true}/>
      <div className={styles.hero}>
        <Container sm gap={0}>
          <div className={styles.heroContent}>
            <div>
              <Text
                h2
                size={31}
                weight="bold"
              >
                Calculate and Optimize
              </Text>
              <Text
                h2
                size={31}
                weight="bold"
                style={{position: "relative", bottom: 6}}
              >
                Web Page Carbon Footprint
              </Text>
              <Text size={18} style={{paddingBottom: 20, maxWidth: 500, opacity: 0.8}}>A carbon emission calculator that takes into account the power consumption of device and server during browsing a web page.</Text>
              <Link href="/calculate">
                <Button size="lg" color="gradient"  css={{ $$primaryColor: "#330025" }} auto>Start Calculating</Button>
              </Link>
              <Link href="https://www.researchgate.net/publication/367284593_A_CARBON_FOOTPRINT_CALCULATOR_TOOL_FOR_WEB_PAGES" target="_blank">
                <p style={{textAlign: "center", width: 170, opacity: 0.5, marginTop: 5}}>See the paper</p>
              </Link>
            </div>
            <Image src="/illustrations/illustration3.svg" width={320} height={320} style={{marginTop: 20, marginBottom: 20}} alt="il3"/>

          </div>
        </Container>
      </div>

      <ScrollDown/>

      <Container sm gap={0}>
          <Spacer y={3} />
          <Image src="/tres.png" width={120} height={30} style={{ display: "block", margin: "auto", marginTop: 20}} alt="action trees"/>
          <Text
            h2
            size={31}
            weight="bold"
            style={{textAlign: "center", marginTop: 20}}>How It Works?</Text>
          <Text size={18} style={{textAlign: "center", maxWidth: 700, margin: "auto", paddingLeft: 10, paddingRight: 10}}>This calculator allows you to continuously analyze your web page in 4 steps.</Text>

          <Spacer y={1} />

          <div className={styles.infoBox} style={{backgroundColor: "#F1EAFD"}}>
            <Image src="/glyphs/edit-page-svgrepo-com.svg" width={40} height={40} style={{marginTop: 20, marginBottom: 10}} alt="icon1"/>

            <Text h3 size={21} weight="bold">Prompt</Text>
            <Text size={18}>Enter the URL, estimate monthly pageviews and first/returning visit ratio of the web page you want to analyze and click the ‘Calculate’ button.</Text>
          </div>


          <div className={styles.infoBox} style={{backgroundColor: "#EAF9FE"}}>
            <Image src="/glyphs/calculator-svgrepo-com.svg" width={40} height={40} style={{marginTop: 0, marginBottom: 10}} alt="icon1"/>
            <Text h3 size={21} weight="bold">Calculate</Text>
            <Text size={18}>The calculator fetches the data from the entered URL, applies various audits, calculates the page load size and calculates the energy consumption depending on the server location of the web page served.</Text>
          </div>


          <div className={styles.infoBox} style={{backgroundColor: "#F9FFCE"}}>
            <Image src="/glyphs/text-page-svgrepo-com.svg" width={40} height={40} style={{marginTop: 0, marginBottom: 10}} alt="icon1"/>
            <Text h3 size={21} weight="bold">Report</Text>
            <Text size={18}>The calculator tool then generates a report that includes the carbon footprint in terms of kg CO2, the amount of trees needed to offset the carbon footprint, and a list of recommendations to optimize the web page using Google Lighthouse metrics.</Text>
          </div>


          <div className={styles.infoBox} style={{backgroundColor: "#DBF2E2"}}>
            <Image src="/glyphs/admin-tools-svgrepo-com.svg" width={40} height={40} style={{marginTop: 0, marginBottom: 10}} alt="icon1"/>
            <Text h3 size={21} weight="bold">Optimize</Text>
            <Text size={18}>You can then take action and apply the recommended changes and optimizations to reduce the carbon footprint of the web page using the given documentation links.</Text>
          </div>
      </Container>

      <Container sm gap={0}>

        <Image src="/illustrations/illustration1.svg" width={170} height={170} style={{display: "block", margin: "auto", marginTop: 50}} alt="il1"/>
        <Text
          h2
          size={31}
          weight="bold"
          style={{textAlign: "center", marginTop: 20}}>Open Source</Text>
        <Text size={18} style={{textAlign: "center", maxWidth: 700, margin: "auto", paddingLeft: 10, paddingRight: 10}}>This complete project is open source and licensed under <a href="https://github.com/btk/carbonneutralwebsite/blob/main/LICENSE.md" target="_blank" rel="noreferrer">MIT License</a>. Feel free to make contributions, send pull requests or fork the current project.</Text>

        <a href="https://github.com/btk/carbonneutralwebsite/" className={styles.github} target="_blank" rel="noreferrer"><Image src="/glyphs/github-svgrepo-com.svg" width={20} height={20} alt="github"/> <span>See on GitHub</span></a>

        <Spacer y={1} />




        <Image src="/illustrations/illustration2.svg" width={170} height={170} style={{display: "block", margin: "auto", marginTop: 100}} alt="il1"/>
        <Text
          h2
          size={31}
          weight="bold"
          style={{textAlign: "center", marginTop: 20}}>Details and Metrics</Text>
          <Text size={18} style={{textAlign: "center", maxWidth: 700, margin: "auto", paddingLeft: 10, paddingRight: 10}}>
          The calculator reports are based on various metrics, see details of these processes and the assumptions we made while designing this tool.
          </Text>

        <Spacer y={1} />

        <Accordion />
        <Spacer y={1} />

        {true &&
          <a href="https://github.com/btk/carbonneutralwebsite/issues/new" target="_blank" rel="noreferrer">
            <div className="resultCol">
              <h3>Do you have feedback?</h3>
              <span>This project is still in beta stage. You can give feedback and detail your problems by creating a new issue in this Github repository.</span>
            </div>
          </a>
        }
      </Container>
      <Footer/>
    </div>
  )
}
