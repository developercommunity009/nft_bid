import React from 'react'
import Image from 'next/image';


// INTERNAL IMPORT
import Style from "./Banner.module.css";
import image from "../../img";

const Banner = ({ bannerImage }) => {

  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image src={bannerImage} objectFit='cover' width={1500} height={300} />
      </div>
      <div className={Style.banner_img_mobile}>
        <Image src={bannerImage} objectFit='cover' width={1600} height={900} />
      </div>
    </div>
  )
}

export default Banner