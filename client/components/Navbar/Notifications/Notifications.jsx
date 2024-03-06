import React, { useState } from 'react'
import Image from 'next/image';
import { useSession } from "next-auth/react"
// INTERNAL IMPORT 
import Style from "./Notifications.module.css";
import images from '../../../img';

const Notifications = (props) => {
    const {data : session}= useSession();
    const { image, username, discreption } = props;
    
  
    // let i = 1;
    // var interval = setInterval( increment, 1000);
    
    // function increment(){
    //     i = i % 360 + 1;
    //     console.log(i);
    // }


    return (
        <div className={Style.notification}>
            <p>Notification</p>
            <div className={Style.notification_box}>
                <div className={Style.notification_box_img}>
                    <Image src={ image ? `https://nft-bid.vercel.app/static/${image}` : images.profile} alt='Notifications Imges' width={50} height={50} className={Style.notification_box_img} />
                </div>
                <div className={Style.notification_box_info}>
                    <h4>{username ? username : session ? session?.user?.name : "Nobody LogedIn"}</h4>
                    <p>{discreption ? discreption : ""}</p>
                    <small id='clock'> {username? "seconds ago" :"" }</small>
                </div>
                {username || session !== undefined ? <span className={Style.notification_box_new}></span> :""}
            </div>
        </div>
    )
}

export default Notifications
