import React from 'react'
import Image from 'next/image'

// INTERNAL IMPORT
import Style from "./Services.module.css"
import images from '../../img'
const Services = () => {
    return (
        <div className={Style.services}>
            <div className={Style.services_box}>
                <div className={Style.services_box_item}>
                  <Image src={images.service1} alt='Services Images' width={100} height={100} />
                  <p className={Style.services_box_item_step}>
                  <span>Step 1</span>
                  </p>
                  <h3>Filter & Discover</h3>
                  <p>Connect with wallet , discover, buy NFTs, sell your NFT's to make Mony</p>
                </div>
                <div className={Style.services_box_item}>
                  <Image src={images.service2} alt='Services Images2' width={100} height={100} />
                  <p className={Style.services_box_item_step}>
                  <span>Step 1</span>
                  </p>
                  <h3>Filter & Discover</h3>
                  <p>Connect with wallet , discover, buy NFTs, sell your NFT's to make Mony</p>
                </div>
                <div className={Style.services_box_item}>
                  <Image src={images.service3} alt='Services Images' width={100} height={100} />
                  <p className={Style.services_box_item_step}>
                  <span>Step 1</span>
                  </p>
                  <h3>Connect Wallet</h3>
                  <p>Connect with wallet , discover, buy NFTs, sell your NFT's to make Mony</p>
                </div>
                <div className={Style.services_box_item}>
                  <Image src={images.service4} alt='Services Images' width={100} height={100} />
                  <p className={Style.services_box_item_step}>
                  <span>Step 1</span>
                  </p>
                  <h3>Start trady</h3>
                  <p>Connect with wallet , discover, buy NFTs, sell your NFT's to make Mony</p>
                </div>
            </div>
        </div>
    )
}

export default Services