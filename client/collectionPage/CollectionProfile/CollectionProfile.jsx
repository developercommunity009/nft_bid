import React from 'react'
import Image from 'next/image';
import {
  TiSocialFacebook, TiSocialInstagram, TiSocialYoutube
  , TiSocialLinkedin, TiSocialTwitter, TiArrowSortedDown, TiArrowSortedUp
} from "react-icons/ti";

// INTERNAL IMPORT
import Style from "./CollectionProfiole.module.css";
import images from "../../img";

const CollectionProfile = () => {

  const cardData = [1, 2, 3, 4];

  return (
    <div className={Style.collectionProfile} >
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image src={images.nft_image_1}
            alt='collection Profile'
            width={280}
            height={280}
            className={Style.collectionProfile_box_left_img}
          />
          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
        </div>
        <div className={Style.collectionProfile_box_middle}>
        <h1>Awesome NFTs Collection</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam provident molestiae quam sequi ipsam similique, blanditiis numquam placeat doloremque, architecto officia, et velit incidunt. Veniam inventore recusandae voluptatibus delectus. Magnam?</p>
         <div className={Style.collectionProfile_box_middle_box}>
         {
          cardData.map((el , i)=>(
            <div key={i+1} className={Style.collectionProfile_box_middle_box_item}>
             <small>Floor price</small>
              <p>${i+1}56,987</p>
              <span>+{i+2}.11%</span>
            </div>
          ))
         }
         </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionProfile