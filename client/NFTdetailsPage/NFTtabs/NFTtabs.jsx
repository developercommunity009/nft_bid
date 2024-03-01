import React, { useState } from 'react'
import Image from 'next/image';


// INTERNAL IMPORT
import Style from "./NFTtabs.module.css";
import images from "../../img";

const NFTtabs = ({ dataTab, icon }) => {
    console.log(dataTab)
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
                dataTab.map((el, i) => (
                    <div className={Style.NFTtabs_box} key={i + 1}>
                        <Image src={`http://127.0.0.1:3001/static/${el.owner.image}`} alt='Profile image' width={40} height={40} className={Style.NFTtabs_box_img} />
                        <div className={Style.NFTtabs_box_info}>
                            <span>{el?.owner?.name}{" "}{icon}</span>
                            <small>TraxnHash : {el?.transaction?.txnhash}</small>
                            <small>{formatDate(el.date)}</small>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default NFTtabs