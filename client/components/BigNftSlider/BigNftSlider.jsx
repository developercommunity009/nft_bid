import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { AiFillFire, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from 'react-icons/md';
import { TbArrowBigLeftLine, TbArrowBigRightLine } from 'react-icons/tb';

// INRTNAL IMPORT
import Style from "./BigNftSlider.module.css";
import images from '../../img';
import { Button } from '../componentIndex';
import { SideBar } from '../Navbar';


const BigNftSlider = () => {

    const [idNumber, setIdNumber] = useState(1);

    const sliderData = [
        {
            title: "1-Hello NFT",
            id: 1,
            name: "Code Vertix",
            collection: "Many Other",
            price: "0005543 ETH",
            like: 349,
            image: images.user1,
            nftImage: images.nft_image_1,
            time: {
                days: 27,
                hours: 10,
                minutes: 11,
                seconds: 35
            }
        },
        {
            title: "2-Hello NFT",
            id: 2,
            name: "Code Vertix",
            collection: "2-Many Other",
            price: "0543 ETH",
            like: 34,
            image: images.user2,
            nftImage: images.nft_image_2,
            time: {
                days: 30,
                hours: 15,
                minutes: 22,
                seconds: 25
            }
        },
        {
            title: "3-Hello NFT",
            id: 3,
            name: "Code Vertix",
            collection: "Many Other",
            price: "003 ETH",
            like: 39,
            image: images.user3,
            nftImage: images.nft_image_3,
            time: {
                days: 25,
                hours: 60,
                minutes: 17,
                seconds: 38
            }
        },
        {
            title: "4-Hello NFT",
            id: 4,
            name: "Code Vertix",
            collection: "Many Other",
            price: "09999 ETH",
            like: 666,
            image: images.user4,
            nftImage: images.nft_image_1,
            time: {
                days: 57,
                hours: 50,
                minutes: 15,
                seconds: 35
            }
        },
    ]

    const increement = useCallback(()=>{
        if(idNumber +1 < sliderData.length){
            setIdNumber(idNumber +1);
        }
    },[idNumber , sliderData.length]);



    const decreement = useCallback(()=>{
        if(idNumber  > 0){
            setIdNumber(idNumber -1);
        }
    },[idNumber ]);

    useEffect(()=>{
        increement();
    },[])

    return (
        <div className={Style.BigNftSlider}>
            <div className={Style.BigNftSlider_box}>
                <div className={Style.BigNftSlider_box_left}>
                    <h2>{sliderData[idNumber].title}</h2>
                    <div className={Style.BigNftSlider_box_left_creator}>
                        <div className={Style.BigNftSlider_box_left_creator_profile}>
                            <Image src={sliderData[idNumber].image} alt='Profile Image' width={50} height={50}
                                className={Style.BigNftSlider_box_left_creator_profile_img} />
                            <div className={Style.BigNftSlider_box_left_creator_profile_img}>
                                <p>Creator</p>
                                <h4>{sliderData[idNumber].name} <span><MdVerified /></span></h4>
                            </div>
                        </div>
                        <div className={Style.BigNftSlider_box_left_creator_collection}>
                            <AiFillFire className={Style.BigNftSlider_box_left_creator_collection_icon} />
                            <div className={Style.BigNftSlider_box_left_creator_collection_info}>
                                <p>collection</p>
                                <h4>{sliderData[idNumber].collection}</h4>
                            </div>
                        </div>
                    </div>
                    <div className={Style.BigNftSlider_box_left_bidding}>
                        <div className={Style.BigNftSlider_box_left_bidding_box}>
                            <small>Current Bid</small>
                            <p>{sliderData[idNumber].price} <span>$ 334.005</span></p>
                        </div>
                        <p className={Style.BigNftSlider_box_left_bidding_box_auction}>
                            <MdTimer className={Style.BigNftSlider_box_left_bidding_box_icon} />
                            <span>Auction Ending In</span>
                        </p>
                        <div className={Style.BigNftSlider_box_left_bidding_box_timer}>
                            <div className={Style.BigNftSlider_box_left_bidding_box_timer_item}>
                                <p>{sliderData[idNumber].time.days}</p>
                                <span>Days</span>
                            </div>
                            <div className={Style.BigNftSlider_box_left_bidding_box_timer_item}>
                                <p>{sliderData[idNumber].time.hours}</p>
                                <span>Hours</span>
                            </div>
                            <div className={Style.BigNftSlider_box_left_bidding_box_timer_item}>
                                <p>{sliderData[idNumber].time.minutes}</p>
                                <span>mins</span>
                            </div>
                            <div className={Style.BigNftSlider_box_left_bidding_box_timer_item}>
                                <p>{sliderData[idNumber].time.seconds}</p>
                                <span>secs</span>
                            </div>
                        </div>

                        <div className={Style.BigNftSlider_box_left_button}>
                            <Button btnName="Place" handleClick={() => { }} />
                            <Button btnName="View" handleClick={() => { }} />
                        </div>
                    </div>
                    <div className={Style.BigNftSlider_box_left_sliderBtn}>
                        <TbArrowBigLeftLine className={Style.BigNftSlider_box_left_sliderBtn_icon}
                            onClick={() => decreement()} />
                        <TbArrowBigRightLine className={Style.BigNftSlider_box_left_sliderBtn_icon}
                            onClick={() => increement()} />
                    </div>
                </div>

                <div className={Style.BigNftSlider_box_right}>
                    <div className={Style.BigNftSlider_box_right_box}>
                        <Image  src={sliderData[idNumber].nftImage} alt='NFT IMG' 
                        className={Style.BigNftSlider_box_right_box_img} />
                        <div className={Style.BigNftSlider_box_right_box_like}>
                            <AiFillHeart />
                            <span>{sliderData[idNumber].like}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigNftSlider