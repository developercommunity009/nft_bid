import React from 'react'
import Link from 'next/link';

// INTERNAL IMPORT
import Style from "./Discover.module.css";


const Discover = () => {

    //-----  DISCOVER MENU
    const discover = [
        {
            name: "Collection",
            link: "collection"
        },
        {
            name: "Search",
            link: "searchPage"
        },
        {
            name: "Auther Profile",
            link: "auther"
        },
        {
            name: "NFT Details",
            link: "NFT-details"
        },
        {
            name: "Upload NFT",
            link: "uploadNFT"
        },
        {
            name: "Account Setting",
            link: "account"
        },
        {
            name: "Connect Wallet",
            link: "connectWallet"
        },
        {
            name: "Blog",
            link: "blog"
        },
    ]


    return (
        <div>
            {
                discover.map((el, i) => (
                    <div key={i + 1} className={Style.discover}>
                        <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Discover