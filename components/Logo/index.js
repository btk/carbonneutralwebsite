import Image from 'next/image'
import styles from "./style.module.css"

function Logo({size}){

  return(
    <>
      <Image className={styles.logo} height={size ? size : 133} width={size ? size : 133} src={require("../../public/logo.svg")} alt={`Logo`}/>
    </>
  );
}

export default Logo;
