import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    MdVerified, MdCloudUpload,
    MdTimer, MdReportProblem, MdOutlineDeleteSweep
} from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaWallet, FaPercentage } from 'react-icons/fa';
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialInstagram,
    TiSocialYoutube
} from "react-icons/ti";

import { BiTransferAlt, BiDollar } from "react-icons/bi";



// INTERNAL IMPORT 
import Style from "./NFTDiscription.module.css";
import formStyle from "../../Account/From/From.module.css";
import images from "../../img";
import { Button } from '../../components/componentIndex';
import { NFTtabs, BidTab } from '../NFTdetailsPageIndex';

//  IMPORT SMART CONTRACT
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
import { buyNftFun, createTransaction, getSingalNft, nftBiding , finalizeBidd } from '../../features/nft/nftSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'

const NFTDescription = ({ nft }) => {
console.log(nft)
    const { buyNFT, currentAccount, saleNFT,saleNFTBid    , buyNFTWithBidding, finalaizeBidding, refundBidding, saleNFTId, token, userId, buyNftHash, bidAction } = useContext(NFTMarkitplaceContext);
    const { singalNFTs } = useSelector((state) => state.nft)
    const dispatch = useDispatch();
    const { trans } = useSelector((state) => state.nft);
    const router = useRouter();
    const { tokenId } = router.query;

    const targetDate = nft?.endTime;


    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [history, setHistory] = useState(false);
    const [bidding, setBidding] = useState(false);
    const [biddingValue, setBiddingValue] = useState(0);
    const [provanance, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);
    const [txnComplete, setTxnComplete] = useState(false);
    const [txnBidComplete, setTxnBidComplete] = useState(false);

    const txrnData = ({
        txnhash: buyNftHash,
        buyer: userId,
        nftId: nft._id,
        amount: nft.price
    })

    const txrnDataWithBidding = ({
        txnhash: buyNftHash,
        buyer: singalNFTs?.currentHighestBid?.bidder,
        nftId: nft._id,
        amount: singalNFTs?.currentHighestBid?.amount
    })

    const nftData = {
        nftId: nft.tokenId,
        biddingValue: biddingValue,
        token,
        amount: biddingValue,
        id: nft._id,
        bidder: userId
    }


    const ownerData = ({
        owner: userId,
        transaction: trans?._id
    })

    const ownerDataByBid = ({
        owner: singalNFTs?.currentHighestBid?.bidder,
        transaction: trans?._id
    })

    useEffect(() => {
        if (buyNftHash !== null) {
            dispatch(createTransaction({ txrn: txrnData, token: token }));
            setTxnComplete(true)
        }
    }, [buyNftHash])

    useEffect(() => {
        if (buyNftHash !== null && saleNFTBid !== false) {
            dispatch(createTransaction({ txrn: txrnDataWithBidding, token: token }));
            setTxnBidComplete(true)
        }
    }, [buyNftHash])


    useEffect(() => {
        dispatch(getSingalNft({ id: nft._id, token }))
    }, [nft])



    const openSocial = () => {
        if (!social) {
            setSocial(true);
            setNFTMenu(false)
        } else {
            setSocial(false);
        }
    }


    useEffect(() => {
        if (saleNFT !== false && txnComplete !== false) {
            dispatch(buyNftFun({ id: saleNFTId, ownerData: ownerData, token: token }));
        }
    }, [trans])

    useEffect(() => {
        if (saleNFTBid !== false && txnBidComplete !== false) {
            dispatch(finalizeBidd({ id: nft._id, ownerData: ownerDataByBid, token: token }));
        }
    }, [trans])



    useEffect(() => {
        if (bidAction === true) {
            dispatch(nftBiding(nftData));
        }
    }, [bidAction])


    const openNFTMenu = () => {
        if (!NFTMenu) {
            setNFTMenu(true);
            setSocial(false);
        } else {
            setNFTMenu(false);
        }
    }

    const openTabe = (e) => {
        const btnText = e.target.innerText;
        if (btnText == "Bid History") {
            setHistory(true);
            setProvanance(false);
            setOwner(false);
        } else if (btnText == "Provanance") {
            setHistory(false);
            setProvanance(true);
            setOwner(false);
        }
    }

    const openOwer = () => {
        if (!owner) {
            setOwner(true)
            setProvanance(false);
            setHistory(false)
        } else {
            setOwner(false);
        }
    }

    const calculateTimeRemaining = (targetDate) => {
        const now = new Date(); // Current date
        const difference = new Date(targetDate) - now; // Difference in milliseconds

        // Calculate remaining days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);


    //    console.log(remainingTime)

    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                { /*      Part ONE  */}
                <div className={Style.NFTDescription_box_share}>
                    <p>Vertual Worlds</p>
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openSocial()} />
                        {
                            social && (
                                <div className={Style.NFTDescription_box_share_box_icon_social}>
                                    <a href="#"><TiSocialFacebook />Facebook</a>
                                    <a href="#"><TiSocialLinkedin />LinkedIn</a>
                                    <a href="#"><TiSocialTwitter />Twitter</a>
                                    <a href="#"><TiSocialInstagram />Insagram</a>
                                    <a href="#"><TiSocialYoutube />Youtube</a>
                                </div>
                            )
                        }
                        <BsThreeDots className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openNFTMenu()} />
                        {
                            NFTMenu && (
                                <div className={Style.NFTDescription_box_share_box_icon_social}>
                                    <a href="#"><BiDollar />Change Price</a>
                                    <a href="#"><BiTransferAlt />Transfer</a>
                                    <a href="#"><MdReportProblem />Report abouse</a>
                                    <a href="#"><MdOutlineDeleteSweep />Delete item</a>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/*  Part Second    */}

                <div className={Style.NFTDescription_box_profile}>
                    <h1>{singalNFTs?.metadata?.name} TokenID#{tokenId}</h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        <div className={Style.NFTDescription_box_profile_box_right}>
                            <Image src={`https://nft-bid.vercel.app/static/${singalNFTs?.creator?.image}`}
                                alt='Profile'
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_right_info}>
                                <small>Creator</small><br></br>
                                <Link href={{ pathname: "/auther", query: `${nft.seller}` }} >
                                    <span>{singalNFTs?.creator?.name} <MdVerified /></span>
                                </Link>

                            </div>
                        </div>
                    </div>
                    {singalNFTs?.seller && <div className={Style.NFTDescription_box_profile_box}>
                        <div className={Style.NFTDescription_box_profile_box_right}>
                            <Image src={`https://nft-bid.vercel.app/static/${singalNFTs?.seller?.image}`}
                                alt='Profile'
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_right_info}>
                                <small>Seller</small><br></br>
                                <Link href={{ pathname: "/auther", query: `${nft.seller}` }} >
                                    <span>{singalNFTs?.seller?.name} <MdVerified /></span>
                                </Link>

                            </div>
                        </div>
                    </div>
                    }

                    <div className={Style.NFTDescription_box_profile_biding}>
                        <h2>
                            Rated  : {nft.ratingsQuantity}
                        </h2>
                        <Rating
                            readonly={true}
                            initialValue={nft.ratingsQuantity}
                        />
                        {remainingTime.seconds > 0 ?  <p>
                            <MdTimer /> <span>Auction ending in:</span>
                        </p> : ""}
                        {remainingTime.seconds > 0 ?
                            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
                                <div
                                    className={
                                        Style.NFTDescription_box_profile_biding_box_timer_item
                                    }
                                >
                                    <p>{remainingTime.days}</p>
                                    <span>Days</span>
                                </div>
                                <div
                                    className={
                                        Style.NFTDescription_box_profile_biding_box_timer_item
                                    }
                                >
                                    <p>{remainingTime.hours}</p>
                                    <span>hours</span>
                                </div>
                                <div
                                    className={
                                        Style.NFTDescription_box_profile_biding_box_timer_item
                                    }
                                >
                                    <p>{remainingTime.minutes}</p>
                                    <span>mins</span>
                                </div>
                                <div
                                    className={
                                        Style.NFTDescription_box_profile_biding_box_timer_item
                                    }
                                >
                                    <p>{remainingTime.seconds}</p>
                                    <span>secs</span>
                                </div>
                            </div> : ""}
                            {remainingTime.seconds < 0 ? <h1>Bidding Time is Over</h1> :""}

                        <h3>Price : {nft.price}</h3>

                        <div className={Style.NFTDescription_box_profile_biding_box_price}>
                            {singalNFTs?.currentHighestBid && <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                                <small>Current Bid</small>
                                <p>{singalNFTs.currentHighestBid.amount}  ETH</p>
                            </div>}
                         { remainingTime.seconds ? currentAccount == singalNFTs?.seller?.wallet.toLowerCase() && <Button btnName="Finalize Bidding" handleClick={() => { finalaizeBidding(nft.tokenId) }}
                                classStyle={Style.button} /> : ""}
                            {remainingTime.seconds < 0 && <Button btnName="refund Bid" handleClick={() => { refundBidding(nft.tokenId) }}
                                classStyle={Style.button} /> } 
                        </div>
                        {
                            bidding && <div className={formStyle.From_box_input}>
                                <div className={formStyle.From_box_input_box}>
                                    <div className={formStyle.From_box_input_box_icon}>
                                        <BiDollar />
                                    </div>
                                    <input type="number" placeholder='bidding' onChange={(e) => setBiddingValue(e.target.value)} />
                                </div>
                            </div>
                        }
                        <div className={Style.NFTDescription_box_profile_biding_box_button}>
                            {currentAccount == singalNFTs?.seller?.wallet.toLowerCase() && singalNFTs.listedNFT == false ? (
                                <Button icon=<FaWallet /> btnName="List to MarketPlace"
                                    handleClick={() => router.push(
                                        `/reSellToken?_id=${singalNFTs._id}&id=${singalNFTs.tokenId}&tokenURI=${singalNFTs.tokenURL}`)}
                                    classStyle={Style.button} />
                            )

                                :
                                currentAccount == singalNFTs?.seller?.wallet.toLowerCase() ? (
                                    <p>You cannot buy your own NFT</p>
                                )
                                    :
                                    (
                                        <Button icon=<FaWallet /> btnName="Buy NFT" handleClick={() => { buyNFT(nft) }}
                                            classStyle={Style.button} />
                                    )
                            }

                        {currentAccount !== singalNFTs?.seller?.wallet.toLowerCase() &&
                               <Button icon=<FaPercentage /> btnName={bidding ? "Bid" : "Make offer"}
                                    handleClick={() => { if (bidding === true) { buyNFTWithBidding(nftData) } else { setBidding(true) } }}
                                    classStyle={Style.button} /> }
                        </div>
                        <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                            <button onClick={() => openOwer()}>Owners History</button>
                           {remainingTime.seconds ? <button onClick={(e) => openTabe(e)}>Bid History</button>: "" }
                        </div>
                        {
                            owner && (
                                <div className={Style.NFTDescription_box_profile_biding_box_card}>
                                    <NFTtabs dataTab={singalNFTs?.ownershipHistory} icon=<MdVerified /> />
                                </div>
                            )
                        }
                        { history && (
                            <div className={Style.NFTDescription_box_profile_biding_box_card}>
                                <BidTab BidData={singalNFTs?.bids} icon=<MdVerified /> />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NFTDescription
