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
        <title>Virtual Forest - Carbon Neutral Website</title>
        <meta name="description" content="Browse websites with good ratings and calculation results listed on the Carbon Neutral Website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Container sm>
        <Spacer/>
        <Spacer/>
        <h1 style={{fontSize: 32}}>Virtual Forest</h1>
        <p style={{fontSize: 19}}>Browse websites calculation results of few websites, feel free to visit these websites and compare the emission amount and data they serve.</p>


        <div className="forest" style={{marginTop: 20}}>
          <a href="https://buraktokak.com/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/buraktokak.com/36.86mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://apple.com/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/apple.com/1.24g/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://svgrepo.com/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/svgrepo.com/32.24mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://metu.edu.tr/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/metu.edu.tr/500.46mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://hacettepe.edu.tr/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/hacettepe.edu.tr/1.33g/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://ankara.edu.tr/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/ankara.edu.tr/132.49mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://gazi.edu.tr/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/gazi.edu.tr/346.96mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://atauni.edu.tr/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/atauni.edu.tr/436.57mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://www.500px.com/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/www.500px.com/589.11mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

          <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/stackoverflow.com/50.89mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>

        </div>

        <p style={{fontSize: 19, marginTop: 5}}>Would you like us to add your website here? <b><a href="mailto:info@buraktokak.com">Contact Us.</a></b></p>
      </Container>
      <Footer/>
    </div>
  )
}
