import React, { useState } from 'react'
import Image from 'next/image';


// INTERNAL IMPORT
import Style from "./NFTtabs.module.css";
import images from "../../img";

const BidTab = ({ BidData, icon }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const dateParts = [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getDate().toString().padStart(2, '0'),
            date.getHours().toString().padStart(2, '0'),
            date.getMinutes().toString().padStart(2, '0'),
            date.getSeconds().toString().padStart(2, '0')
        ];

        return dateParts.join('-');
    };
    return (

        <div className={Style.NFTtabs}>
            {
                BidData.map((el, i) => (
                    <div className={Style.NFTtabs_box} key={i + 1}>
                        <Image src={`https://nft-bid.vercel.app/static/${el?.bidder.image}`} alt='Profile image' width={40} height={40} className={Style.NFTtabs_box_img} />
                        <div className={Style.NFTtabs_box_info}>
                            <span>{el?.bidder.name}{" "}{icon}</span>
                            <h5>Amount : {el?.amount}</h5>
                            <small>{formatDate(el.timestamp)}</small>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default BidTab
