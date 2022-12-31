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

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Plant Trees - Carbon Neutral Website</title>
        <meta name="description" content="Carbon Neutral Website can help you plant the trees in order to offset your webpage's carbon footprint, here is more information." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Container sm>
        <Spacer/>
        <Spacer/>
        <h1 style={{fontSize: 32}}>Plant Trees <span className="soon">SOON</span></h1>
        <p style={{fontSize: 19}}>Carbon Neutral Website can help you plant the trees in order to offset your webpage&lsquo;s carbon footprint, here is more information.</p>

        <div style={{height: 400, marginTop: 20}}>
          <p style={{fontSize: 24, fontWeight: "bold"}}>🚧 Coming Soon!</p>
        </div>
      </Container>
      <Footer/>
    </div>
  )
}
