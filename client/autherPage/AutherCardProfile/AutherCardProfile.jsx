import React, { useState } from 'react'
import Image from 'next/image';
import { MdVerified, MdCloudUpload, MdOutlineReportProblem } from 'react-icons/md';
import { FiCopy } from "react-icons/fi";
import {
    TiSocialFacebook, TiSocialLinkedin,
    TiSocialYoutube, TiSocialInstagram, TiSocialTwitter
} from 'react-icons/ti';
import { BsThreeDots } from 'react-icons/bs';


// INTERNAL IMPORT
import Style from "./AutherCardProfile.module.css";
import images from "../../img";
import { Button } from '../../components/componentIndex';



const AutherCardProfile = ({currentAccount}) => {

    const [share, setShare] = useState(false);
    const [report, setReport] = useState(false);


    const copyAddress = () => {
        const copyText = document.getElementById("myInput");
        copyText.select()
        navigator.clipboard.writeText(copyText.value);
    }

    const openShare = () => {
        if (!share) {
            setShare(true);
            setReport(false);
        } else {
            setShare(false);
        }
    }
    const openReport = () => {
        if (!report) {
            setReport(true);
            setShare(false);
        } else {
            setReport(false);
        }
    }

    return (
        <div className={Style.authorProfileCard}>
            <div className={Style.authorProfileCard_box}>
                <div className={Style.authorProfileCard_box_img}>
                    <Image src={images.nft_image_1} className={Style.authorProfileCard_box_img_img}
                        alt="NFT IMG"
                        height={220}
                        width={220}
                    />
                </div>
                <div className={Style.authorProfileCard_box_info}>
                    <h2>Code Vertix {" "} {" "}<span><MdVerified />{" "}</span></h2>
                    <div className={Style.authorProfileCard_box_info_address}>
                        <input type="text" value={currentAccount} placeholder={currentAccount} id='myInput' />
                        <FiCopy onClick={() => copyAddress()}
                            className={Style.authorProfileCard_box_info_address_icon} />
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut unde alias asperiores ea eos, optio sit explicabo vero, dolore fugiat ut a itaque molestias e</p>
                    <div className={Style.authorProfileCard_box_info_social}>
                        <a href="#"> <TiSocialFacebook /></a>
                        <a href="#"> <TiSocialTwitter /></a>
                        <a href="#"> <TiSocialYoutube /></a>
                        <a href="#"> <TiSocialLinkedin /></a>
                    </div>
                </div>
                <div className={Style.authorProfileCard_box_share}>
                    <Button btnName="Follow" handleClick={() => { }} />
                    <MdCloudUpload onClick={() => openShare()}
                        className={Style.authorProfileCard_box_share_icon}
                    />
                    {
                        share && (
                            <div className={Style.authorProfileCard_box_share_upload}>
                                <p><span><TiSocialFacebook /> </span>{" "} Facebook</p>
                                <p><span><TiSocialInstagram /> </span>{" "} Facebook</p>
                                <p><span><TiSocialYoutube /> </span>{" "} Facebook</p>
                                <p><span><TiSocialLinkedin /> </span>{" "} Facebook</p>
                            </div>
                        )
                    }
                    <BsThreeDots onClick={() => openReport()}
                        className={Style.authorProfileCard_box_share_icon}
                    />
                    {
                        report && (
                            <p className={Style.authorProfileCard_box_share_report}>
                            
                                    <span>
                                        <MdOutlineReportProblem />
                                    </span>{" "} {" "}Report abouse
                            
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AutherCardProfile