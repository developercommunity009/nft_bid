import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';


//  INTERNAL IMPORT
import Style from "./Error.module.css";
import images from "../../img";


//  SMARTA CONTRACT
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
const Errorr = () => {

    const { error, setOpenError } = useContext(NFTMarkitplaceContext)
    console.log(error);
    return (
        <div className={Style.Error} onClick={()=> setOpenError(false)}>
            <div className={Style.Error_box}>
                <div className={Style.Error_box_info}>
                    <Image
                        alt='error Image'
                        src={images.error}
                        height={200}
                        width={200}
                        objectFit='cover'
                        className={Style.Error_box_img}
                    />
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}

export default Errorr