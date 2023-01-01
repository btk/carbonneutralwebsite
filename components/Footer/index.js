import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"
import { Container, Spacer } from '@nextui-org/react';

import Logo from '@/components/Logo'

function Header(){

  return(
    <>
      <div className={styles.footer}>
        <Container sm gap={0}>
          <div className={styles.footerInner}>
            <div>
              <Link href="/">
                <Logo size={90} />
              </Link>
              <p style={{color: "#333"}}>Carbon Neutral Website is a carbon emission calculator that takes into account the power consumption of device and server during browsing a web page.</p>
              <p style={{color: "#666", paddingBottom: 20, fontWeight: "600"}}>&copy; 2023 &middot; Carbon Neutral Website</p>
            </div>
            <div>
            <a href="https://carbonneutralwebsite.org/" target="_blank" rel="noreferrer">
              <Image src="/api/banner/carbonneutralwebsite.org/36.57mg/light.svg" width={300} height={120} alt="Carbon impact of this web page" style={{marginBottom: 15}}/>
            </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
