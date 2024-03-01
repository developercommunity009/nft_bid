import React from 'react'
import Image from 'next/image';

// INTERNLA IMPORT
import Style from "./HeroSection.module.css";
import images from '../../img';
import { Button } from '../componentIndex';

const HeroSection = () => {
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1>Discover , collect and sell NFT's 🖼️</h1>
                    <p>discover the most outstanding NFT's in all topics your NFT's and sell them</p>
                    <Button btnName="start your search" />
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image src={images.hero} alt="Hero Image" width={600} height={600} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection