import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Import Icons
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
// Internal Import
import Style from "./NaveBar.module.css";
import { Discover, HelpCenter, Notifications, Profile, SideBar } from "./index"
import { Button, Errorr } from "../componentIndex";
import images from '../../img';

//   IMPORT FROM SMART CONATRACT
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglUser, googleLogIn } from '../../features/user/userSlice';
import { useSession, signIn, signOut } from "next-auth/react"
import Networks from './Networks/Networks';

const NaveBar = () => {

    const { data: session } = useSession();

    const image = session?.user?.image;

    const router = useRouter();
    const dispatch = useDispatch();
    const { token, userId } = useContext(NFTMarkitplaceContext);

    //-------USESTATS  COMPONENTS
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [network, setNetwork] = useState(false);
    const [selectedNetwork, setselectedNetwork] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [userImg, setUserImg] = useState();
    // const [googleUser , setGoogleUser] = useState(false);
    const { logedInUser } = useSelector((state) => state.auth);
    const { googleUser } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getSinglUser({ token, id: userId }))
    }, [userId]);

    useEffect(() => {
        setUserImg(logedInUser?.image)
    }, [logedInUser, googleUser])



    // const openMenu = (e) => {
    //     const btnText = e.target.innerText;
    //     if(btnText == "Discover") {
    //         setDiscover(true);
    //         setHelp(false);
    //         setNotifications(false);
    //         setProfile(false);
    //     }else if(btnText == "Help Center"){
    //         setHelp(true);
    //         setDiscover(false);
    //         setNotifications(false);
    //         setProfile(false);
    //     }else{
    //         setDiscover(false);
    //         setHelp(false);
    //         setNotifications(false);
    //         setProfile(false);
    //     }
    // }

    const openDiscover = () => {
        if (!discover) {
            setDiscover(true);
            setHelp(false);
            setNotifications(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotifications(false);
            setProfile(false);
        }
    }

    const helpCenter = () => {
        if (!help) {
            setHelp(true);
            setDiscover(false);
            setNotifications(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotifications(false);
            setProfile(false);
        }
    }

    const openNetwork = () => {
        if (!network) {
            setNetwork(true);
            setHelp(false);
            setDiscover(false);
            setNotifications(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotifications(false);
            setProfile(false);
            setNetwork(false);
        }
    }

    const openNoyification = () => {
        if (!notifications) {
            setNotifications(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotifications(false);
        }
    }

    const openProfile = () => {
        if (!profile) {
            setProfile(true);
            setNotifications(false);
            setDiscover(false);
            setHelp(false);
        } else {
            setProfile(false);
        }
    }

    const openSideBar = () => {
        if (!openSideMenu) {
            setOpenSideMenu(true);
        } else {
            setOpenSideMenu(false);
        }
    }


    //  ------   SMART CONTRACT SECTIONS
    const { currentAccount, connectWallet, openError, setSelectedUrl } = useContext(NFTMarkitplaceContext);

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Image src={images.pngpng} alt="NFT LOGO " width={100} height={100}
                            onClick={() => router.push("/")} />

                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <input type="text" placeholder='serch NFT' />
                        <BsSearch onClick={() => { }} className={Style.search_icon} />
                    </div>
                </div>
                { /*   END OF LEFT SECTION   */}

                <div className={Style.navbar_container_right}>

                    {/*DISCOVER MENU*/}

                    <div className={Style.navbar_container_right_discover}>
                        <p onClick={() => openDiscover()}>Discover</p>
                        {
                            discover && (
                                <div className={Style.navbar_container_right_discover_box}>
                                    <Discover />
                                </div>
                            )}
                    </div>
                    { /*HELP CENTER MENU*/}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={() => helpCenter()} >Help Center</p>
                        {
                            help && (
                                <div className={Style.navbar_container_right_help_box}>
                                    <HelpCenter />
                                </div>
                            )}
                    </div>

                    {/* NOTIFICATIONS*/}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications className={Style.notify} onClick={() => openNoyification()} />
                        {notifications && (<Notifications googleUser={googleUser} image={logedInUser?.image}
                            username={logedInUser?.name} discreption={logedInUser?.discreption}
                        />)}
                    </div>

                    {/* CREATE BUTTON SECTIONS*/}
                    <div className={Style.navbar_container_right_button}>
                        {currentAccount == "" ? (<Button btnName={userId ? "Connect" : "Login"} handleClick={() => {
                            if (userId) { connectWallet() } else {
                                { router.push("/login") }
                            }
                        }} />)
                            : (<Button btnName="Create" handleClick={() => router.push("/uploadNFT")} />
                            )}
                    </div>

                    {/*NETWORK SECTION*/}
                    <div className={Style.navbar_container_right_profile_box}>
                        <p onClick={() => openNetwork()} >{selectedNetwork ? selectedNetwork : "Select Network"}</p>
                        {
                            network && (
                                <div className={Style.navbar_container_right_help_box}>
                                    <Networks setselectedNetwork={setselectedNetwork} setSelectedUrl={setSelectedUrl} />
                                </div>
                            )}
                    </div>


                    {/* USER PROFILE */}
                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            <Image src={userImg ? `https://nft-bid.vercel.app/static/static/${userImg}` : images.profile} alt="NFT user1" height={40} width={40} onClick={() => openProfile()}
                                className={Style.navbar_container_right_profile} />
                            {profile && (<Profile googleUser={googleUser} logedInUser={logedInUser} currentAccount={currentAccount} />)}
                        </div>
                    </div>

                    {/* MENU BUTTON */}
                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight className={Style.menuIcon} onClick={() => openSideBar()} />
                    </div>
                </div>
            </div>
            {/* SIDE BAR COMPONENT  THIS ONLY FOR MOBILE */}
            {
                openSideMenu && (
                    <div className={Style.sideBar}>
                        <SideBar setOpenSideMenu={setOpenSideMenu}
                            currentAccount={currentAccount}
                            connectWallet={connectWallet}
                        />
                    </div>
                )
            }
            {openError && <Errorr />}
        </div>
    )
}

export default NaveBar
