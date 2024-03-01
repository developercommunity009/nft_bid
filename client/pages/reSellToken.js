import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

//  INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../Account/From/From.module.css";
import { Button } from '../components/componentIndex';
import { BiTransferAlt, BiDollar } from "react-icons/bi";


//  IMPORT SMART CONTRACT
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, finalizeBidd, reSaleNf, reSellByBiding } from '../features/nft/nftSlice';

const reSellToken = () => {

    const dispatch = useDispatch();

    const { createSale, tokenURL, reSellWithBid,  token, userId, createSaleWithBidding, nftId, nftIdSend, transHash } = useContext(NFTMarkitplaceContext);

    const { trans } = useSelector((state) => state?.nft);

    // const [txnComplete, setTxnComplete] = useState(false);
    const [bidDuration, setBidDuration] = useState(0);

    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [bidding, setBidding] = useState(false);
    const [reSellStatus, setreSellStatus] = useState(true);

    const router = useRouter();
    const { _id, id, tokenURI } = router.query;


  

    const reSellByBidding = {
        tokenURI,
        price,
        bidDuration,
        reSellStatus,
        id
    }


    useEffect(() => {
        if (nftId !== null){
            dispatch(reSaleNf({ id: _id, price: price, token }));
        }
    }, [nftId])

    useEffect(() => {
        if (reSellWithBid){
            dispatch(reSellByBiding({ id: _id, price: price, endingTime: bidDuration, token }));
        }
    }, [reSellWithBid])

    const feytchNFT = async () => {
        if (!tokenURI) return;
        const { data } = await axios.get(tokenURI);
        // setPrice(data.price);
        setImage(data.image);
    }

    useEffect(() => {
        feytchNFT();
    }, [id]);

    const resell = async () => {
        await createSale(tokenURI, price, true, id);

    }



    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>ReSell Your Token , Set Price</h1>
                <div className={formStyle.From_box_input}>
                    <label htmlFor="name">Price</label>
                    <input type="number" name="" placeholder='reSell price'
                        min={1} className={formStyle.From_box_input_userName}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className={Style.reSellToken_box_image}>
                    {
                        image && <Image src={image} alt='reSell _nft'
                            height={400} width={400} />
                    }
                </div>
                {
                    bidding && 
                    <div className={formStyle.From_box_input}>
                    <div className={formStyle.From_box_input_box}>
                        <div className={formStyle.From_box_input_box_icon}>
                            <BiDollar />
                        </div>
                        <input type="number" placeholder='Enter Time Duration then Write Time In Seconds' onChange={(e) => setBidDuration(e.target.value)}  />
                    </div>
                </div>
                }
                <br></br>
                <br></br>
                <div className={Style.reSellToken_box_btn}>
                    <Button btnName="Resell NFT" handleClick={() => resell()} />
                    <Button btnName={bidding ? "Set Bidding" : "Resell NFT Bidding"} handleClick={() => { if (bidding === true) { createSaleWithBidding(reSellByBidding) } else { setBidding(true) } }} />
                </div>

            </div>
        </div >
    )
}

export default reSellToken