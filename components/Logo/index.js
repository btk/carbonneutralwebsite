import Image from 'next/image'
import styles from "./style.module.css"

function Logo({height}){

  return(
    <>
      <Image className={styles.logo} height={height ? height : 133} src={require("../../public/logo.svg")} alt={`Logo`}/>
    </>
  );
}

export default Logo;
