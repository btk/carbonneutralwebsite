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

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Carbon Neutral Website - Web Page Carbon Emission Calculator</title>
        <meta name="description" content="Carbon Neutral Website is a carbon emission calculator that takes into account the power consumption of device and server during browsing a web page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>

        <div className={styles.heroContent}>
        <Logo />
          <>
            <Text
              h2
              size={31}
              weight="bold"
            >
              Calculate Your Website&apos;s
            </Text>
            <Text
              h2
              size={31}
              weight="bold"
            >
              Carbon Footprint
            </Text>
          </>
          <Link href="/calculate">
            <Button size="lg" color="gradient"  css={{ $$primaryColor: "#330025" }} auto>Start Calculating</Button>
          </Link>

          <Container sm gap={0}>
            <Spacer y={1} />
            <img src="/illustrations/illustration1.svg" width={300} alt="il1"/>
            <div/>
            <img src="/illustrations/illustration2.svg" width={300} alt="il2"/>
            <div/>
            <img src="/illustrations/illustration3.svg" width={300} alt="il3"/>
            <div/>
            <img src="/illustrations/illustration4.svg" width={300} alt="il4"/>
          </Container>
          <img src="/tres.png" style={{width: 120, display: "block", margin: "auto", paddingTop: 20}} alt="action trees"/>

        </div>
      </div>

      <Container sm gap={0}>
        <Spacer y={1} />
        <Accordion />

                {true &&
                  <a href="https://github.com/btk/carbonneutralwebsite/issues/new">
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
