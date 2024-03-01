import React, { useState } from 'react'
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';


// INTERNAL IMPORT
import Style from "./AutherTabs.module.css";


const AutherTabs = ({ setCollectables, setCreated, setCollectablesDb, setCreatedDb , setLike, setFollower, setFollwing }) => {

    const [openList, setOpenList] = useState(false);
    const [activeBtn, setActiveBtn] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState("Most Viewed");

    const listArray = [
        "Created admn",
        "Most Appreciated",
        "Most Discussed",
        "Most Viewed",
    ]

    const openTab = (e) => {
        const btnText = e.target.innerText;

        if (btnText == "Listed NFT's") {
            setCollectables(true);
            setCreated(false);
            setLike(false);
            setFollower(false);
            setFollwing(false);
            setActiveBtn(1)
        } else if (btnText == "Own NFT's") {
            setCollectables(false);
            setCreated(true);
            setLike(false);
            setFollower(false);
            setFollwing(false);
            setActiveBtn(2)
        } else if (btnText == "Listed NFT DB") {
            setCollectablesDb(true)
            setCreatedDb(false)
            setCollectables(false);
            setCreated(false);
            setLike(false);
            setFollower(false);
            setFollwing(false);
            setActiveBtn(3)
        } else if (btnText == "Own NFT DB") {
            setCreatedDb(true)
            setCollectablesDb(false)
            setCollectables(false);
            setCreated(false);
            setLike(false);
            setFollower(false);
            setFollwing(false);
            setActiveBtn(4)
        }
        else if (btnText == "Liked") {
            setCollectables(false);
            setCreated(false);
            setLike(true);
            setFollower(false);
            setFollwing(false);
            setActiveBtn(5)
        }
        else if (btnText == "Following") {
            setCollectables(false);
            setCreated(false);
            setLike(false);
            setFollower(false);
            setFollwing(true);
            setActiveBtn(6)
        }
        else if (btnText == "Followers") {
            setCollectables(false);
            setCreated(false);
            setLike(false);
            setFollower(true);
            setFollwing(false);
            setActiveBtn(7)
        }

    }




    const opendropdownList = () => {
        if (!openList) {
            setOpenList(true)
        } else {
            setOpenList(false)
        }
    }
    const setSelectedmenuList = (el) => {
        setSelectedMenu(el)
    }


    return (
        <div className={Style.autherTabs}>
            <div className={Style.autherTabs_box}>
                <div className={Style.autherTabs_box_left}>
                    <div className={Style.autherTabs_box_left_btn}>
                        <button
                            className={`${activeBtn == 1 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Listed NFT's{" "}
                        </button>
                        <button
                            className={`${activeBtn == 2 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Own NFT's{" "}
                        </button>
                        <button
                            className={`${activeBtn == 3 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Listed NFT DB{" "}
                        </button>
                        <button
                            className={`${activeBtn == 4 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Own NFT DB{" "}
                        </button>
                        <button
                            className={`${activeBtn == 5 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Liked {" "}
                        </button>
                        <button
                            className={`${activeBtn == 6 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Following {" "}
                        </button>
                        <button
                            className={`${activeBtn == 7 ? Style.active : ""}`}
                            onClick={(e) => openTab(e)}>Followers {" "}
                        </button>
                    </div>
                </div>


                <div className={Style.autherTabs_box_right}>
                    <div className={Style.autherTabs_box_right_para}
                        onClick={() => opendropdownList()}
                    >
                        <p>{selectedMenu}</p>
                        {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    </div>
                    {
                        openList && (
                            <div className={Style.autherTabs_box_right_list}>
                                {
                                    listArray.map((el, i) => (
                                        <div key={i + 1}
                                            className={Style.autherTabs_box_right_list_item}
                                            onClick={() => setSelectedmenuList(el)}>
                                            <p>{el}</p>
                                            <span>{selectedMenu == el && <TiTick />}</span>
                                        </div>
                                    ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AutherTabs