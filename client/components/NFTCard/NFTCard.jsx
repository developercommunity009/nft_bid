import React, { useContext, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';


// INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";
import { useDispatch } from 'react-redux';
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
import { viewsUser, whislist } from '../../features/nft/nftSlice';


const NFTCard = ({ NFTCard }) => {

    const { token } = useContext(NFTMarkitplaceContext);
    const dispatch = useDispatch();


    return (
        <div className={Style.nftcard}>
            {
                NFTCard.map((el, i) => (
                    <div className={Style.nftcard_box} key={i + 1}>
                        <div className={Style.nftcard_box_img}>
                            <Image src={el?.metadata?.image} alt='NFT IMG'
                                height={600}
                                width={600} className={Style.nftcard_box_img_img} />
                        </div>
                        <div className={Style.nftcard_box_update}>
                            <div className={Style.nftcard_box_update_left} onClick={()=>   dispatch(whislist({nftId: el._id , token:token}))}>
                                <div className={Style.nftcard_box_update_left_like}>
                                    <AiOutlineHeart /> {" "}{el?.likes?.length}
                                </div>
                            </div>
                            <div className={Style.nftcard_box_update_right_like}>
                                <div className={Style.nftcard_box_update_right_info}>
                                    <small>Reaming Time</small>
                                    <p>02h: 04h: 55s</p>
                                </div>
                            </div>
                        </div>
                        <div className={Style.nftcard_box_update_details}>
                            <div className={Style.nftcard_box_update_details_price}>
                                <div className={Style.nftcard_box_update_details_price_box}>
                                    <h4>{el?.metadata?.name} #{el.tokenId}</h4>
                                    <div className={Style.nftcard_box_update_details_price_box_box}>
                                        <div className={Style.nftcard_box_update_details_price_box_bid}>
                                            <small>Current Bid</small>
                                            <p>{el.price}ETH</p>

                                        </div>
                                        <div className={Style.nftcard_box_update_details_price_box_stock}>
                                            <small>61 in stock</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={{ pathname: "/NFT-details", query: el }}>
                                <div className={Style.nftcard_box_update_details_category}  onClick={()=>   dispatch(viewsUser({nftId: el._id , token:token}))}> 
                                    <BsImage />
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div >

    )
}

export default NFTCard