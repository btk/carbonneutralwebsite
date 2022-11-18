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
        <title>Carbon Neutral Website - Calculate Your Website&apos;s Carbon Footprint</title>
        <meta name="description" content="Carbon Neutral Website is a carbon emission calculator that will take into account the power consumption of the devices used to access web pages and web servers, as well as the carbon footprint of the internet infrastructure." />
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
        </div>
      </div>

      <Container sm gap={0}>
        <Spacer y={1} />
        <Accordion />
      </Container>
      <Footer/>
    </div>
  )
}
