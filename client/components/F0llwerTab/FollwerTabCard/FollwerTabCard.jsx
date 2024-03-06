import React, { useContext, useState } from 'react'
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

// INTERNAL IMPORT
import Style from "./FollwerTabCard.module.css";
import images from "../../../img";
import { useDispatch } from 'react-redux';
import { followingUnFollowingUser } from '../../../features/user/userSlice';

import { NFTMarkitplaceContext } from '../../../Context/NFTMarketplaceContext';


const FollwerTabCard = ({ el, i }) => {

    const dispatch =useDispatch();
    const { token } = useContext(NFTMarkitplaceContext);
 
    const [following, setFollwing] = useState(false);

    const followMe = () => {
        if (!following) {
            setFollwing(true);
        } else {
            setFollwing(false);
        }
    }

    const userData ={
        userId:el.image[0].creator._id,
        token:token
    }

    return (
        <div className={Style.FollwerTabCard}>
            <div className={Style.FollwerTabCard_rank}>
                <p>
                    #{i + 1} <span>🏅</span>
                </p>
            </div>
            <div className={Style.FollwerTabCard_box}>
                <div className={Style.FollwerTabCard_box_img}>
                    <Image src={el.backgroung || images.creatorbackground1} alt='Backround img'
                        width={500} height={300}
                        className={Style.FollwerTabCard_box_img_img}
                        objectFit='cover'
                    />
                </div>
                <div className={Style.FollwerTabCard_box_profile}>
                  <Image src={`https://nft-bid.vercel.app/static/${el?.image[0]?.creator?.image}` || images.user1} className={Style.FollwerTabCard_box_profile_img}
                        alt='Profile Image'
                        width={50}
                        height={50}
                    />
                </div>
                <div className={Style.FollwerTabCard_box_info}>
                    <div className={Style.FollwerTabCard_box_info_name}>
                        <div className='.FollwerTabCard_box_info_nameinfo'>
                            <h4>{el.seller.slice(0, 15) + "...." + el.seller.slice(-4)}</h4>
                        </div>

                        <p>{el.total || 0}  ETH</p>
                    </div>
                    <div className={Style.FollwerTabCard_box_info_following}>
                        <a onClick={() => {dispatch(followingUnFollowingUser(userData));followMe()}}>{following ? "Follow" : "Following"}{following && <span><TiTick /></span>}</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FollwerTabCard
