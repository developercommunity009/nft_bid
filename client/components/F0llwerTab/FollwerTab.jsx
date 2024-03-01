import React, { useState, useEffect } from 'react'
import { RiUserFollowFill, RiUserUnfollowFill, RiAwardLine } from 'react-icons/ri';


//  INTERNAL IMPORT
import Style from "./FollwerTab.module.css";
import FollwerTabCard from './FollwerTabCard/FollwerTabCard';
import images from "../../img";

const FollwerTab = ({TopCreator}) => {


    const [papular, setPapulra] = useState(true);
    const [follwing, setFollwing] = useState(false);
    const [news, setNews] = useState(false);

    // const cardArray = [
    //     {
    //         backgroung: images.creatorbackground1,
    //         user: images.user1,
    //     },
    //     {
    //         backgroung: images.creatorbackground2,
    //         user: images.user2,
    //     },
    //     {
    //         backgroung: images.creatorbackground3,
    //         user: images.user3,
    //     },
    //     {
    //         backgroung: images.creatorbackground4,
    //         user: images.user4,
    //     },
    //     {
    //         backgroung: images.creatorbackground5,
    //         user: images.user5,
    //     },
    // ];
    const followingArray = [
        {
            backgroung: images.creatorbackground3,
            user: images.user3,
            seller: "0xrtyui789fghjk789ghj78o"
        },
        {
            backgroung: images.creatorbackground4,
            user: images.user4,
            seller: "0xrtyui789fghjk789ghj78o"
        },
        {
            backgroung: images.creatorbackground5,
            user: images.user5,
            seller: "0xrtyui789fghjk789ghj78o"
        },
        {
            backgroung: images.creatorbackground1,
            user: images.user1,
            seller: "0xrtyui789fghjk789ghj78o"
        },
        {
            backgroung: images.creatorbackground2,
            user: images.user2,
            seller: "0xrtyui789fghjk789ghj78o"
        },

    ];
    const newsArray = [
        {
            backgroung: images.creatorbackground5,
            user: images.user5,
            seller: "0xqwer567890fghjklvbn"
        },
        {
            backgroung: images.creatorbackground1,
            user: images.user1,
            seller: "0xqwer567890fghjklvbn"
        },

        {
            backgroung: images.creatorbackground3,
            user: images.user3,
            seller: "0xqwer567890fghjklvbn"
        },
        {
            backgroung: images.creatorbackground4,
            user: images.user4,
            seller: "0xqwer567890fghjklvbn"
        },

        {
            backgroung: images.creatorbackground2,
            user: images.user2,
            seller: "0xqwer567890fghjklvbn"
        },

    ];



    const openPapular = () => {
        if (!papular) {
            setPapulra(true);
            setFollwing(false);
            setNews(false);
        }
    }

    const openFollowing = () => {
        if (!follwing) {
            setPapulra(false);
            setFollwing(true);
            setNews(false);
        }
    }
    const openNews = () => {
        if (!news) {
            setPapulra(false);
            setFollwing(false);
            setNews(true);
        }
    }

    return (
        <div className={Style.followerTab}>
            <div className={Style.followerTab_title}>
                <h2>Top Creatores List...</h2>
                <div className={Style.followerTab_tabs}>
                    <div className={Style.followerTab_tabs_btn}>
                        <button onClick={() => openPapular()}>
                            <RiUserFollowFill /> Popular
                        </button>
                        <button onClick={() => openFollowing()}>
                            <RiUserUnfollowFill /> Follwing
                        </button>
                        <button onClick={() => openNews()}>
                            <RiAwardLine /> NoteWrothly
                        </button>
                    </div>
                </div>
            </div>
            {
                papular && (
                    <div className={Style.followerTab_box}>
                        {
                            TopCreator.map((el, i) => (
                                <FollwerTabCard key={i + 1} i={i} el={el} />
                            ))
                        }
                    </div>
                )
            }
            {
                follwing && (
                    <div className={Style.followerTab_box}>
                        {
                            followingArray.map((el, i) => (
                                <FollwerTabCard key={i + 1} i={i} el={el} />
                            ))
                        }
                    </div>
                )
            }
            {
                news && (
                    <div className={Style.followerTab_box}>
                        {
                            newsArray.map((el, i) => (
                                <FollwerTabCard key={i + 1} i={i} el={el} />
                            ))
                        }
                    </div>
                )
            }

            <div className={Style.followerTab_member}>
                <div className={Style.followerTab_member_box}>
                    <a href="#">Show me more</a>
                    <a href="#">Become, auther</a>
                </div>
            </div>

        </div>
    )
}


export default FollwerTab