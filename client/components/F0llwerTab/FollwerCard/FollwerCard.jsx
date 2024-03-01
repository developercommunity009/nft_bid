import React, { useState } from 'react'
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

// INTERNAL IMPORT
import Style from "../FollwerTabCard/FollwerTabCard.module.css";
import images from "../../../img";

const FollwerCard = ({el , i}) => {
    const [following, setFollwing] = useState(false);

    const followMe = () => {
        if (!following) {
            setFollwing(true);
        } else {
            setFollwing(false);
        }
    }

   



    return (
        <div className={Style.FollwerTabCard}>
            <div className={Style.FollwerTabCard_rank}>
                <p>
                    #{i + 1}
                </p>
            </div>
            <div className={Style.FollwerTabCard_box}>
                <div className={Style.FollwerTabCard_box_img}>
                    <Image src={el.backgroung || images.creatorbackground1} alt='Backround img'
                        width={500} height={300}
                        className={Style.FollwerTabCard_box_img_img}
                        objectFit='cover'
                    />
                </div>
                <div className={Style.FollwerTabCard_box_profile}>
                  <Image src={`http://127.0.0.1:3001/static/${el.image}` || images.user1} className={Style.FollwerTabCard_box_profile_img}
                        alt='Profile Image'
                        width={50}
                        height={50}
                    />
                </div>
                <div className={Style.FollwerTabCard_box_info}>
                    <div className={Style.FollwerTabCard_box_info_name}>
                        <div className='.FollwerTabCard_box_info_nameinfo'>
                 <h4>{el.wallet.slice(0, 15) + "...." + el.wallet.slice(-4)}</h4>
                           {/* <h4>{el.seller}</h4> */}
                        </div>

                        <p>name : {el.name} </p>
                        <p>role : {el.role}</p>
                    </div>
                  
                </div>
            </div>
        </div>

    )
}

export default FollwerCard