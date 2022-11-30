import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"
import { Container, Spacer } from '@nextui-org/react';

import Logo from '@/components/Logo'

function Header(){

  return(
    <>
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <Spacer y={0.1} />
          <Spacer y={0.5} />
          <Logo size={90} />
          <p style={{color: "#333"}}>Carbon Neutral Website is a carbon emission calculator that will take into account the power consumption of the devices used to access web pages and web servers, as well as the carbon footprint of the internet infrastructure. This calculator will also tell you the amount of trees you should plant to offset your website&#39;s carbon footprint.</p>
          <img src="/tres.png" style={{width: 120, display: "block", margin: "auto", paddingTop: 20}} alt="action trees"/>
          <p style={{color: "#666", textAlign: "center", paddingBottom: 20, fontWeight: "500"}}>&copy; 2022 &middot; Dream Oriented Limited</p>
        </div>
      </div>
    </>
  );
}

export default Header;
