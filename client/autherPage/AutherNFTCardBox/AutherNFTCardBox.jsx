import React, { useState } from 'react'
import Image from 'next/image';

// INTERNALA IMPORT
import Style from "./AutherNFTCardBox.module.css";
import images from "../../img";
import { NFTCardtwo } from '../../collectionPage/collectionIndex';
// import FollwerTabCard from '../../components/F0llwerTab/FollwerTabCard/FollwerTabCard.jsx';
import FollwerCard from '../../components/F0llwerTab/FollwerCard/FollwerCard';
import NFTCardtwoB from '../../collectionPage/NFTCardtwoB/NFTCardtwoB';
import { useSelector } from 'react-redux';

const AutherNFTCardBox = ({
    collectables,
    created,
    collectablesDb,
    createdDb,
    like,
    follower,
    following,
    nfts,
    mynfts,
    nftsc,
    ownNftscDb,
    nftsDelisted
}) => {

    const {logedInUser} = useSelector((state)=> state.auth)
       const { ownDeListed } = useSelector((state) => state.nft)
    console.log(ownDeListed)
    return (
        <div className={Style.AutherNFTCardBox}>
            {collectables && (<NFTCardtwo NFTData = {nfts}  />)}
            {created && (<NFTCardtwo NFTData = {mynfts}/>)}
            {collectablesDb && (<NFTCardtwoB NFTData = {ownNftscDb}  />)}
            {createdDb && (<NFTCardtwoB NFTData = {ownDeListed}/>)}
            {like && (<NFTCardtwoB NFTData = {logedInUser?.whislist} />)}
            {follower && (
                <div className={Style.AutherNFTCardBox_box}>
                    { logedInUser?.followors?.map((el , i)=>(
                        <FollwerCard  el ={el} i = {i} key={i+1} />
                    ))
                    }
                </div>
            )}
            {following && (
                <div className={Style.AutherNFTCardBox_box}>
                    {  logedInUser?.following?.map((el , i)=>(
                        <FollwerCard el={el} i={i} key={i+1} />
                    ))
                    }
                </div>
            )}
        </div>
    )
}

export default AutherNFTCardBox
