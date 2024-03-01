import React from 'react'
import Image from 'next/image';
import { BsCircleFill } from "react-icons/bs"

// INTERNAL IMPORT
import Style from "./Catagory.module.css";
import images from '../../img';
const Catagory = () => {

    const categoryArray = [images.creatorbackground10,images.creatorbackground10,images.creatorbackground2,images.creatorbackground4,images.creatorbackground8,images.creatorbackground1];

    return (
        <div className={Style.box_category}>
            <div className={Style.catagory}>
                {
                    categoryArray.map((el, i) => (
                        <div className={Style.catagory_box} key={i + 1}>
                            <Image src={el}
                                className={Style.catagory_box_img}
                                alt='Category Image'
                                width={350}
                                height={150}

                            />
                            <div className={Style.catagory_box_title}>
                                <span> <BsCircleFill /></span>
                                <div className={Style.catagory_box_title_info}>
                                    <h4>Entertainment</h4>
                                    <small>1991 NFTS</small>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Catagory