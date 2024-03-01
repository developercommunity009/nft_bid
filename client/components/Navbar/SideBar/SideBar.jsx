import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GrClose } from "react-icons/gr"
import {
    TiSocialFacebook, TiSocialInstagram, TiSocialYoutube
    , TiSocialLinkedin, TiSocialTwitter, TiArrowSortedDown, TiArrowSortedUp
} from "react-icons/ti";

//  INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from '../../../img';
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {

    //------  USESTATE
    const [openDiscover, setOpenDiscover] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    //-----  DISCOVER MENU
    const discover = [
        {
            name: "Collections",
            link: "collections"
        },
        {
            name: "Search",
            link: "serach"
        },
        {
            name: "Auther Profile",
            link: "auther-profile"
        },
        {
            name: "Auther profile",
            link: "auther-profile"
        },
        {
            name: "NFT Details",
            link: "nft-details"
        },
        {
            name: "Account Setting",
            link: "account-setting"
        },
        {
            name: "Connect Wallet",
            link: "connect_wallet"
        },
        {
            name: "Blog",
            link: "blog"
        }
    ]

    //-----  Help Center Menu

    const helpCenter = [
        {
            name: "About",
            link: "about"
        },
        {
            name: "Contact Us",
            link: "contact-us"
        },
        {
            name: "Sign Up",
            link: "sign-up"
        },
        {
            name: "Sign In",
            link: "sign-in"
        },
        {
            name: "Subscription",
            link: "subscription"
        },
    ]

    const closeSideBar = () => {
        setOpenSideMenu(false);
    }

    const openDiscoverMenu = () => {
        if (!openDiscover) {

            setOpenDiscover(true)
        } else {
            setOpenDiscover(false)
        }
    }

    const openHelpMenu = () => {
        if (!openHelp) {
            setOpenHelp(true)
        } else {
            setOpenHelp(false)
        }
    }

    const router = useRouter();


    return (
        <div className={Style.sideBar}>
            <GrClose className={Style.sideBar_closeBtn} onClick={() => closeSideBar()} />
            <div className={Style.sideBar_box}>
                <Image src={images.logo} height={150} width={150} />
                <p> Discover the most Out stading the articals on all topics of NFT Your Own stpries and share them</p>
                <div className={Style.sideBar_social}>
                    <a href="#"> <TiSocialFacebook /></a>
                    <a href="#"> <TiSocialLinkedin /></a>
                    <a href="#"> <TiSocialTwitter /></a>
                    <a href="#"> <TiSocialYoutube /></a>
                    <a href="#"> <TiSocialInstagram /></a>
                </div>
            </div>
            <div className={Style.sideBar_menu}>
                <div>
                    <div className={Style.sideBar_menu_box} onClick={() => openDiscoverMenu()}>
                        <p>Discover</p>
                        <TiArrowSortedDown />
                    </div>
                    {
                        openDiscover && (
                            <div className={Style.sideBar_discover}>
                                {discover.map((el, i) => (
                                    <p key={i + 1}>
                                        <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                                    </p>
                                ))}
                            </div>
                        )
                    }
                </div>
                <div>
                    <div className={Style.sideBar_menu_box} onClick={() => openHelpMenu()}>
                        <p>Help Center</p>
                        <TiArrowSortedDown />
                    </div>
                    {
                        openHelp && (
                            <div className={Style.sideBar_discover}>
                                {
                                    helpCenter.map((el, i) => (
                                        <p key={i + 1}>
                                            <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                                        </p>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={Style.sideBar_button}>
                {
                    currentAccount == ""
                        ? (<Button btnName="Connect" handleClick={() => connectWallet()} />)
                        : (
                            <Button btnName="Create" handleClick={() => router.push("/uploadNFT")} />
                        )
                }
                <Button btnName="Connect Wallet" handleClick={() => { }} />
            </div>
        </div>
    )
}

export default SideBar