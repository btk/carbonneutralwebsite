import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"
import { Container, Spacer } from '@nextui-org/react';

import Logo from '@/components/Logo'

function Header(){

  return(
    <>
      <div className={styles.header}>
        <Container md>
          <Spacer y={0.5} />
          <Link href="/"><Logo size={90} /></Link>
        </Container>
      </div>
    </>
  );
}

export default Header;
