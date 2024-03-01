import React, { useState , useContext } from 'react'



// INTERNAL IMPORT
import Style from "../styles/uploadNFT.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

//  IMPORT CONTRACT
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';

const uploadNFT = () => {

    const {uploadToIpfs , createNFT ,createNFTwithBidding , userId} = useContext(NFTMarkitplaceContext);


    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>You Can Preferred display name , created your profile manage other personal setting</p>
                </div>
                <div className={Style.uploadNFT_box_title}>
                    <h2>Image, Video , Audio or 3D Modek</h2>
                    <p>File types supported : JPG,PNG,GIF,SVG,MP4,WEBM, GLB, GLTF, Max size:100MB </p>
                    <div className={Style.uploadNFT_form}>
                        <UploadNFT 
                        uploadToIpfs = {uploadToIpfs}
                        createNFT = {createNFT}
                        createNFTwithBidding={createNFTwithBidding}
                        userId={userId}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default uploadNFT;