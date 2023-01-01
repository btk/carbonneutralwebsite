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
              <Text size={18} style={{paddingBottom: 20, maxWidth: 500}}>A carbon emission calculator that takes into account the power consumption of device and server during browsing a web page.</Text>
              <Link href="/calculate">
                <Button size="lg" color="gradient"  css={{ $$primaryColor: "#330025" }} auto>Start Calculating</Button>
              </Link>
              <Text size={18} style={{paddingTop: 10, maxWidth: 500, opacity: 0.5}}>(100% free)</Text>

            </div>
            <img src="/illustrations/illustration3.svg" width={300} style={{marginTop: 20, marginBottom: 20}} alt="il3"/>

          </div>
        </Container>

      </div>

      <ScrollDown/>

      <Container sm gap={0}>
          <Spacer y={3} />
          <img src="/tres.png" style={{width: 120, display: "block", margin: "auto", paddingTop: 20}} alt="action trees"/>
          <Text
            h2
            size={31}
            weight="bold"
            style={{textAlign: "center", marginTop: 20}}
          >
            How It Works?
          </Text>
        <img src="/illustrations/illustration1.svg" width={300} alt="il1"/>
        <div/>
        <img src="/illustrations/illustration2.svg" width={300} alt="il2"/>
        <div/>
        <img src="/illustrations/illustration3.svg" width={300} alt="il3"/>
        <div/>
        <img src="/illustrations/illustration4.svg" width={300} alt="il4"/>
      </Container>


      <Container sm gap={0}>
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
