import React from 'react'


// IMPORT INTERNAL
import Style from "./NFTdetailsPage.module.css";
import { NFTDescription, NFTDetailsImg, NFTtabs } from './NFTdetailsPageIndex';


const NFTdetailsPage = ({nft}) => {


    return (
        <div className={Style.NFTdetailsPage}>
            <div className={Style.NFTdetailsPage_box}>
                <NFTDetailsImg   nft={nft} />
                <NFTDescription   nft={nft} />
            </div>
        </div>
    )
}

export default NFTdetailsPage