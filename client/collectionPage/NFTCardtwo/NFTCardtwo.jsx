import React, { useState } from 'react'
import Image from 'next/image';
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import { TbEye } from "react-icons/tb";
import Link from 'next/link';


// INTERNAL IMPORT
import Style from "./NFTCardtwo.module.css";
import images from "../../img";
import { LikeProfile } from '../../components/componentIndex';

const NFTCardtwo = ({ NFTData }) => {

    const [like, setLike] = useState(false);
    const [likeInc, setLikeInc] = useState(96);
    console.log(NFTData)

    const likeNFT = () => {
        if (!like) {
            setLike(true)
            setLikeInc(65)
        } else {
            setLike(false)
            setLikeInc(65 + 1)
        }
    }

    return (
        <div className={Style.NFTCardtwo}>
            {
                NFTData?.map((el, i) => (
                    <div className={Style.NFTCardtwo_box} key={i + 1}>
                        <div className={Style.NFTCardtwo_box_like}>
                            <div className={Style.NFTCardtwo_box_like_box}>
                                <div className={Style.NFTCardtwo_box_like_box_box}>
                                    <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
                                        <BsImage className={Style.NFTCardtwo_box_like_box_box_icon} />
                                    </Link>
                                    <div className={Style.NFTCardtwo_box_like_box_box_like}>
                                        <p >
                                            <AiOutlineHeart /> {" "}{el?.likes?.length}
                                        </p>
                                        <p >
                                            {
                                                <TbEye />
                                            }
                                            {" "}
                                            <span>{el.views}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.NFTCardtwo_box_img}>
                            <Image src={el?.image} alt='NFTtwo' width={255} height={300}
                                className={Style.NFTCardtwo_box_img_img} />
                        </div>
                        <div className={Style.NFTCardtwo_box_info}>
                            <div className={Style.NFTCardtwo_box_info_left}>
                                <LikeProfile />
                                <p>{el?.name}</p>
                                <p>Token ID   {el.tokenId}</p>
                            </div>
                            <small></small>
                        </div>
                        <div className={Style.NFTCardtwo_box_price}>
                            <div className={Style.NFTCardtwo_box_price_box}>
                                <small>Current Bid</small>
                                <p>{el.price}ETH</p>
                            </div>
                            <p className={Style.NFTCardtwo_box_price_stock}>
                                <MdTimer /> {" "} <span>{i}</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default NFTCardtwo