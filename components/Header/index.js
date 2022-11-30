import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"
import { Container, Spacer } from '@nextui-org/react';

import Logo from '@/components/Logo'
import Menu from '@/components/Menu'

function Header(){

  return(
    <>
      <div className={styles.header}>
        <Container sm gap={0}>

          <div className="headerLinks">
            <Link href="/"><Logo size={80} /></Link>
            <Menu/>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
