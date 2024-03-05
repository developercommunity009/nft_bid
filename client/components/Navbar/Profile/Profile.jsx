import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdHelpCenter } from "react-icons/md"
import { TbDownloadOff, TbDownload } from "react-icons/tb"
import { BiLogOutCircle } from "react-icons/bi";
import { useSession , signOut } from "next-auth/react"

// INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from '../../../img';


const Profile = (props) => {
    
    const [userImg, setUserImg] = useState();
    const { logedInUser, currentAccount , googleUser } = props;
    const router = useRouter();

    useEffect(()=>{
        setUserImg(logedInUser?.image)
    },[logedInUser])

    const {data :session} =useSession();
    function handelSignOut(){
        localStorage.clear();
        router.push("/");
        setTimeout(() => {
            signOut();  
        }, 1000);
    }


    // `http://127.0.0.1:3001/static/${image}`}
    return (
        <div className={Style.profile}>
            {logedInUser !== undefined  || session !== undefined  ? <div className={Style.profile_account}>
                <Image src={userImg ? `https://nft-bid.vercel.app/static/${userImg}` : images.profile} alt='Profile Imges' width={50} height={50} className={Style.profile_account_img} />
                <div className={Style.profile_account_info}>
                    <p>{logedInUser ? logedInUser?.name : session ? session?.user?.name : ""}</p>
                    <small>{currentAccount.slice(0, 14)}...</small>
                </div>
            </div> : ""}
            <div className={Style.profile_menu}>
              { logedInUser ? "" : session ? "" :  <div className={Style.profile_menu_one_item}>
                    <FaUserAlt />
                    <p>
                        <Link href={{ pathname: '/login' }}>user login</Link>
                    </p>
                </div>}
           
               <div className={Style.profile_menu_one}>
               {logedInUser !== undefined || session ?    <div className={Style.profile_menu_one_item}>
                        <FaUserAlt />
                        <p>
                            <Link href={{ pathname: '/auther' }}>My Profile</Link>
                        </p>
                    </div> :""}
                    {logedInUser !== undefined || session ?  <div className={Style.profile_menu_one_item}>
                        <FaUserEdit />
                        <p>
                            <Link href={{ pathname: '/account' }}>Edit Profile</Link>
                        </p>
                    </div> :""}
                </div> 
                 <div className={Style.profile_menu_two}>

                 {logedInUser !== undefined &&   <div className={Style.profile_menu_one_item}>
                        <RiLockPasswordLine />
                        <p>
                            <Link href={{ pathname: '/changepassword' }}>Changed Password</Link>
                        </p>
                    </div>}
                 {logedInUser ?  <div className={Style.profile_menu_one_item} onClick={() => {  handelSignOut() }}>
                        <BiLogOutCircle />
                        <p >Log Out</p>
                    </div> : session ?  <div className={Style.profile_menu_one_item} onClick={() => {  handelSignOut() }}>
                    <BiLogOutCircle />
                    <p >Log Out</p>
                </div> :""}
                </div>
              
            </div>
        </div>
    )
}

export default Profile
