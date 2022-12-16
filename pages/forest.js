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
        <p style={{fontSize: 19}}>Browse websites calculation results with good ratings, learn from the best approaches listed on the Carbon Neutral Website.</p>

        <div className="resultCol" style={{height: 400, marginTop: 20}}></div>
      </Container>
      <Footer/>
    </div>
  )
}
