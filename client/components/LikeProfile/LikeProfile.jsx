import React from 'react'
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "./LikeProfile.module.css";
import images from "../../img";
const LikeProfile = ({NFTData}) => {

console.log(NFTData);
  return (
    <div className={Style.like}>
    {
      NFTData?.map((el , i)=>(
         <div className={Style.like_box} key={i+1}>
         <Image src={`http://127.0.0.1:3001/static/${el.image}`} alt='Profile Img'
          width={20} height={20} className={Style.like_box_img} />
         </div>
        ))
    }
    </div>
  )
}

export default LikeProfile