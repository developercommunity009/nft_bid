import React from 'react'
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import {Button}  from "../../components/componentIndex";

const Brand = () => {

    return (

        <div className={Style.brand}>
            <div className={Style.brand_box}>
                <div className={Style.brand_box_left}>
                   <Image src={images.logo}  alt='Brand' width={100} height={100}/>
                   <h1>Earn free Crypto with Ciscrypt</h1>
                   <p>A creative agency that lead and inspire</p>
                   <div className={Style.brand_box_left_btn}>
                   <Button btnName="Create" handleClick={()=>{}}  />
                   <Button btnName="Discover" handleClick={()=>{}}  />
                   </div>
                </div>
                <div className={Style.brand_box_right}>
                   <Image src={images.eran} alt='Logo' height={500} width={600} />
                </div>
            </div>
        </div>
    )
}

export default Brand