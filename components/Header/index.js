import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"

function Header(){

  return(
    <>
      <div className={styles.header}>
        <div className="content">
          <Image className={styles.logo} src={require("../../public/logo.svg")} alt={`Logo`}/>
        </div>
      </div>
    </>
  );
}

export default Header;
