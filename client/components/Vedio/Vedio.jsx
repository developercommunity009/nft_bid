import React from 'react'
import Image from 'next/image';


// IMPORT INTERNAL 
import Style from "./Vedio.module.css";
import images from "../../img";
const Vedio = () => {
    return (
        <div className={Style.vedio}>
            <div className={Style.vedio_box}>
                <h1><span>🎬</span> The Vedios</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic corporis excepturi sunt doloremque possimus inventore beatae fuga nam </p>
                <div className={Style.vedio_box_frame}>
                    <div className={Style.vedio_box_frame_left}>
                        <Image src={images.nft_1} alt='Vedio'
                        className={Style.vedio_box_frame_img}
                        height={500} width={900} />
                    </div>
                    <div className={Style.vedio_box_frame_right}>
                    <h1>CodeVertix</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vedio