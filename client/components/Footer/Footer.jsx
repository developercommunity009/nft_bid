import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {
  TiSocialFacebook, TiSocialInstagram, TiSocialYoutube
  , TiSocialLinkedin, TiSocialTwitter, TiArrowSortedDown, TiArrowSortedUp
} from "react-icons/ti";

import { RiSendPlaneFill } from "react-icons/ri"


// IMPORT INTERNAL
import Style from "./Footer.module.css";
import images from '../../img';
import { Discover, HelpCenter } from "../Navbar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="Footer Logo" width={100} height={100} />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci aliquam illum ipsa at omnis enim vero, velit delectus cum voluptates quae, temporibus explicabo repudiandae maiores soluta? Corrupti nostrum saepe est?</p>
          <div className={Style.footer_social}>
            <a href="#"><TiSocialFacebook /></a>
            <a href="#"><TiSocialInstagram /></a>
            <a href="#"><TiSocialYoutube /></a>
            <a href="#"><TiSocialLinkedin /></a>
            <a href="#"><TiSocialTwitter /></a>
          </div>
        </div>
        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help  Center</h3>
          <HelpCenter />
        </div>
        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder='enter your email *' />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>Discover , collect and sell extraordinary NFTs  OpenSea is the first and Largest NFT MarkitPlace </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer