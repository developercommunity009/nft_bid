import React, { useEffect, useState, useRef } from 'react'
import { motion, scroll } from "framer-motion";
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./Slider.module.css";
import SliderCard from './SliderCard/SliderCard';
import images from "../../img";

const Slider = () => {

    const cardArray = [
        {
            backgroung: images.creatorbackground1,
            user: images.user1,
        },
        {
            backgroung: images.creatorbackground2,
            user: images.user2,
        },
        {
            backgroung: images.creatorbackground3,
            user: images.user3,
        },
        {
            backgroung: images.creatorbackground4,
            user: images.user4,
        },
        {
            backgroung: images.creatorbackground5,
            user: images.user5,
        },
    ];


    const followingArray = [
        {
            backgroung: images.creatorbackground3,
            user: images.user3,
        },
        {
            backgroung: images.creatorbackground4,
            user: images.user4,
        },
        {
            backgroung: images.creatorbackground5,
            user: images.user5,
        },
        {
            backgroung: images.creatorbackground1,
            user: images.user1,
        },
        {
            backgroung: images.creatorbackground2,
            user: images.user2,
        },

    ];





    const [width, setWidth] = useState(0);
    const dragSlider = useRef();

    useEffect(()=>{
       setWidth(dragSlider.current.scrollWidth -  dragSlider.current.offsetWudth)
})
  
    const handleScroll = (direction) => {
      const {current} = dragSlider;
      const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
      if(direction == "left"){
        current.scrollLeft -= scrollAmount
      } else{
        current.scrollLeft += scrollAmount;
      }
    }

    return (
        <div className={Style.slider}>
            <div className={Style.slider_box}>
                <h2>Explore NFTs Video</h2>
                <div className={Style.slider_box_button}>
                    <p>Click on play icon $ enjoy Nfts Vedio</p>
                    <div className={Style.slider_box_button_btn}>
                        <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("left")}>
                            <TiArrowLeftThick  />
                        </div>
                        <div className={Style.slider_box_button_btn_icon} onClick={() => handleScroll("right")}>
                            <TiArrowRightThick  />
                        </div>
                    </div>
                </div>

                <motion.div className={Style.slider_box_items} ref={dragSlider}>
                    <motion.div ref={dragSlider} className={Style.slider_box_item}
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                    >
                   {
                    followingArray.map((el , i)=>(
                        <SliderCard  key={i+1}  el={el} i ={i}/>
                    ))
                   }
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Slider