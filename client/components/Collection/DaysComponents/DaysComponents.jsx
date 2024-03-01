import React from 'react'
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';

// INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({el , i}) => {
    return (
        <div className={Style.dayComponent}>
            <div className={Style.dayComponent_box}>
                <div className={Style.dayComponent_box_img}>
                    <Image src={el.backgroung}
                        className={Style.dayComponent_box_img_img}
                        alt='Days Components'
                        width={365}
                        height={300}
                    />
                </div>
                <div className={Style.dayComponent_box_profile}>
                    <Image className={Style.dayComponent_box_img_1}
                        src={images.creatorbackground2}
                        alt='Back Ground'
                        width={115}
                        height={115}
                    />
                    <Image className={Style.dayComponent_box_img_2}
                        src={images.creatorbackground2}
                        alt='Back Ground'
                        width={115}
                        height={115}
                    />
                    <Image className={Style.dayComponent_box_img_3}
                        src={images.creatorbackground2}
                        alt='Back Ground'
                        width={115}
                        height={115}
                    />

                </div>
                <div className={Style.dayComponent_box_title}>
                    <h2>Amazing Collections</h2>
                    <div className={Style.dayComponent_box_title_info}>
                        <div className={Style.dayComponent_box_title_info_profile}>
                            <Image src={el.user} alt='profile'
                                width={30} height={30}
                                className={Style.dayComponent_box_title_info_profile_img} />
                                <p>Creator <span>CodeVertix</span>{" "}<small><MdVerified  /></small></p>
                        </div>
                        <div className={Style.dayComponent_box_title_info_price}>
                        <small>1.255 ETH</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaysComponents