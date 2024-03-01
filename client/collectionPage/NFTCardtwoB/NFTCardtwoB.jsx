import React, { useContext, useEffect, useState } from 'react'
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
import { nftRating, viewsUser } from '../../features/nft/nftSlice';
import { useDispatch } from 'react-redux';
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
import { Rating } from 'react-simple-star-rating'




const NFTCardtwoB = ({ NFTData }) => {
   console.log(NFTData)
    const dispatch = useDispatch();

    const { token } = useContext(NFTMarkitplaceContext);
    const [rating, setRating] = useState(0)
    const [nftId, setNftId] = useState(null)

  console.log(NFTData);
    useEffect(()=>{
        setTimeout(() => {
            dispatch(nftRating({ nftId: nftId, star: rating, token: token }))
        },500);
    },[nftId])

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }
    const onPointerMove = (value, index) => { }


    return (
        <div className={Style.NFTCardtwo}>
            {
                NFTData?.map((el, i) => {
                    return (
                        <div className={Style.NFTCardtwo_box} key={i + 1}>
                            <div className={Style.NFTCardtwo_box_like}>
                                <div className={Style.NFTCardtwo_box_like_box}>
                                    <div className={Style.NFTCardtwo_box_like_box_box}>
                                        <Link href={{ pathname: "/NFT-details", query: el }} key={i + 1}>
                                            <div className={Style.NFTCardtwo_box_like_box_box_icon} onClick={() => dispatch(viewsUser({ nftId: el._id, token: token }))}>
                                                <BsImage />
                                            </div>
                                        </Link>
                                        <div className={Style.NFTCardtwo_box_like_box_box_like}>
                                            <p >
                                                <AiOutlineHeart /> {" "}{el.likes.length}
                                            </p>
                                            <p >
                                                {
                                                    <TbEye />
                                                }
                                                {" "}
                                                <span>{el.views.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.NFTCardtwo_box_img}>
                                <Image src={el.metadata.image} alt='NFTtwo' width={255} height={300}
                                    className={Style.NFTCardtwo_box_img_img} />
                            </div>
                            <div className={Style.NFTCardtwo_box_info}>
                                <div className={Style.NFTCardtwo_box_info_left}>
                                    <LikeProfile NFTData={el.likes} />
                                    <p>{el.metadata.name}</p>
                                    <p>Token ID   {el.tokenId}</p>
                                </div>
                                <small>{i + 1}</small>
                            </div>

                            <div className={Style.NFTCardtwo_box_price}>
                                <div className={Style.NFTCardtwo_box_price_box}>
                                    <small>Current Bid</small>
                                    <p>{el.price}ETH</p>
                                </div>
                                <p className={Style.NFTCardtwo_box_price_stock}>
                                    <Rating
                                        onClick={(rate) => { handleRating(rate); setNftId(el._id) }}
                                        onPointerMove={onPointerMove}
                                        size={22}
                                    /* Available Props */
                                    />
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NFTCardtwoB