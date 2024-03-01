import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';

// INTERNAL IMPORT 
import Style from "./SliderCard.module.css";
import images from "../../../img";
import LikeProfile from '../../LikeProfile/LikeProfile';

const SliderCard = ({el , i}) => {

    return (
        <motion.div className={Style.sliderCard}>
            <div className={Style.sliderCard_box}>
                <motion.div className={Style.sliderCard_box_img} >
                    <Image src={el.backgroung} alt="Slider Img"
                        width={258}
                        height={300}
                        className={Style.sliderCard_box_img_img}
                    />
                </motion.div>
                <div className={Style.sliderCard_box_title}>
                    <p>NFT Video #651</p>
                    <div className={Style.sliderCard_box_title_like}>
                      { /* <LikeProfile /> */}
                        <small>1 of 100</small>
                    </div>
                </div>
                <div className={Style.sliderCard_box_price}>
                    <div className={Style.sliderCard_box_price_box}>
                        <small>Current Bid</small>
                        <p>0.0231 ETH</p>
                    </div>
                    <div className={Style.sliderCard_box_price_time}>
                        <small>Remaing Time</small>
                        <p>3h : 40m : 23s</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SliderCard