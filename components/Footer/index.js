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

          <a href="https://carbonneutralwebsite.org/" target="_blank" rel="noreferrer">
            <img src="http://carbonneutralwebsite.org/api/banner/carbonneutralwebsite.org/36.57mg/light.svg" width="300px"  alt="Carbon impact of this web page" />
          </a>
          <p style={{color: "#666", textAlign: "center", paddingBottom: 20, fontWeight: "500"}}>&copy; 2022 &middot; Carbon Neutral Website</p>
        </div>
      </div>
    </>
  );
}

export default Header;
