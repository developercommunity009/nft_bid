import React from 'react'

import Link from 'next/link';

// INTERNAL IMPORT
import Style from "../HelpCenter/HelpCenter.module.css";

const Networks = ({setselectedNetwork , setSelectedUrl}) => {

    const Network = [
        {
            name: "MATIC BlockChain",
            url:"https://rpc.ankr.com/polygon_mumbai"
        },
        {
            name: "Goerli BlockChain",
            url:"https://rpc.ankr.com/eth_goerli"
        },
    ]

    return (
        <div className={Style.box}>
            {
                Network.map((el, i) => (
                    <div className={Style.helpCenter} key={i+1}>
                        <p key={i + 1} onClick={()=> {setselectedNetwork(el.name); setSelectedUrl(el.url)}} >{el.name}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Networks