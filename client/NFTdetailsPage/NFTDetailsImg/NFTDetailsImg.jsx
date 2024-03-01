import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';



// INTERNAL IMPORT 
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";
import { useDispatch, useSelector } from 'react-redux';
import { getSingalNft } from '../../features/nft/nftSlice';
import { useRouter } from 'next/router';
import { TbEye } from 'react-icons/tb';

const NFTDetailsImg = ({ nft }) => {
    const router =useRouter();
    const {tokenId , seller}=router.query;
    const dispatch = useDispatch();
    const { singalNFTs } = useSelector((state) => state.nft);

const date = new Date(singalNFTs?.createdAt);
const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
    const [description, setDescription] = useState(true);
    const [details, setDetails] = useState(true);

    useEffect(() => {
        dispatch(getSingalNft(nft._id))
    }, [nft])

    const openDescription = () => {
        if (!description) {
            setDescription(true)
        } else {
            setDescription(false)
        }
    }
    const openDetails = () => {
        if (!details) {
            setDetails(true);
        } else {
            setDetails(false)
        }
    }

    return (

        <div className={Style.NFTDetailsImg}>
            <div className={Style.NFTDetailsImg_box}>
                <div className={Style.NFTDetailsImg_box_NFT}>
                    <div className={Style.NFTDetailsImg_box_NFT_like}>
                        <BsImage className={Style.NFTDetailsImg_box_NFT_like_icon} />
                       
                        
                        <p>
                         <AiFillHeart className={Style.NFTDetailsImg_box_NFT_like_icon} />
                            <span>{singalNFTs?.likes?.length}</span>
                        </p>
                    
                        <p >
                        {
                            <TbEye />
                        }
                        {" "}
                        <span>{singalNFTs?.views?.length}</span>
                    </p>
                    </div>
                  
                    <div className={Style.NFTDetailsImg_box_NFT_img}>
                        <Image src={singalNFTs?.metadata?.image}
                            className={Style.NFTDetailsImg_box_NFT_img_img}
                            objectFit='cover'
                            width={700}
                            height={800}
                            alt='NFTIMG'
                        />
                    </div>
                </div>
                <div className={Style.NFTDetailsImg_box_description}
                    onClick={() => openDescription()}
                >
                    <p>Description</p>
                    {
                        description ?
                            (<TiArrowSortedUp />) :
                            (<TiArrowSortedDown />)
                    }
                </div>
                {
                    description && (
                        <div className={Style.NFTDetailsImg_box_description_box}>
                            <p>{singalNFTs?.metadata?.description}</p>

                        </div>
                    )
                }

                <div className={Style.NFTDetailsImg_box_details}
                    onClick={() => openDetails()}>
                    <p>Details</p>
                    {
                        details ?
                            (<TiArrowSortedUp />) :
                            (<TiArrowSortedDown />)
                    }
                </div>
                {details && (<div className={Style.NFTDetailsImg_box_details_box}>
                    <small>2000 x 2000 px.IMAGE(685KB)</small>
                    <p>
                        <small>Creator Wallet</small><br></br>
                        {singalNFTs?.creator?.wallet}
                    </p>
                    <p>
                        <small>Creator Name</small><br></br>
                        {singalNFTs?.creator?.name}
                    </p>
                    <p>
                        <small>CreatedAt</small><br></br>
                        {formattedDate}
                    </p>
                   <p>
                        <small>Current Saller</small><br></br>
                        {singalNFTs?.seller?.name ? singalNFTs?.seller?.name : "Still not Listed On MarkitPlace" }
                    </p>
                    <p>
                        <small>Token ID  </small>
                &nbsp; {tokenId}
                    </p>
                </div>)}
            </div>
        </div>
    )
}

export default NFTDetailsImg