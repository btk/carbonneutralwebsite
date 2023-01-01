import Link from 'next/link'
import Image from 'next/image'
import styles from "./style.module.css"
import React, { useState } from "react"

const Menu = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="menuToggler" onClick={() => setMenu(!menu)}>
        <svg version="1.1" width={34} height={34} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           viewBox="0 0 460.713 460.713">
          <rect y="115.356" width="302" height="30"/>
          <polygon points="335.786,202.231 398.25,264.694 460.713,202.232 	"/>
          <rect y="315.356" width="302" height="30"/>
          <rect y="215.356" width="302" height="30"/>
        </svg>
      </div>
      <div className={menu ? "menu mobileMenuActive" : "menu mobileMenuPassive"}>
        <Link href={`/calculate/`}><Image src={"/icons/calculator.png"} alt={"calculator icon"} width={25} height={25}/> Calculator</Link>
        <Link href={`/forest/`}><Image src={"/icons/virtual-forest.png"} alt={"forset icon"} width={27} height={27}/> Virtual Forest</Link>
        <Link href={`/plant/`} style={{marginRight: 0}}><Image src={"/icons/plant-trees.png"} alt={"plant icon"} width={30} height={30}/> Plant Trees <span className="soon">SOON</span></Link>
      </div>
    </>
  )
}

export default Menu
