import React from 'react'
import Image from 'next/image';

//  INTERNAL IMPORT
import Style from "../styles/aboutUs.module.css";
import images from "../img";
import { Brand } from "../components/componentIndex";

const aboutUs = () => {

    const founderArray = [
        {
            name: "Niama O'Shea",
            position: "Co-founder and Chief Exective",
            image: images.founder1,
        },
        {
            name: "Danien Jame",
            position: "Co-founder and Chief Exective",
            image: images.founder2,
        },
        {
            name: "Oria Dwyer",
            position: "Co-founder, Chairman",
            image: images.founder3,
        },
        {
            name: "Dara Frazier",
            position: "Co-founder, Chief Strategy Officer",
            image: images.founder4,

        }
    ]


    const factsArray = [
        {
            title: "10 million",
            info: "Articales have been public arounad the world (as of Sept.30,2021)",
        },
        {
            title: "100,000",
            info: "Registrared users account (as of Sept.30,2021)",
        },
        {
            title: "320+",
            info: "Countries and regions have our presense (as of Sept.30,2021)",
        },
    ]


    return (
        <div className={Style.aboutUs}>
            <div className={Style.aboutUs_box}>
                <div className={Style.aboutUs_box_hero}>
                    <div className={Style.aboutUs_box_hero_keft}>
                        <h1>👋 ABOUT US.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit modi non ratione eum officiis quo dolorem quas sapiente porro velit ipsa eaque, reprehenderit rem natus corporis nihil quia possimus hic.</p>

                    </div>
                    <div className={Style.aboutUs_box_hero_right}>
                        <Image src={images.hero2} />
                    </div>
                </div>

                <div className={Style.aboutUs_box_title}>
                    <h2>Founder</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, exercitationem facilis ratione sed nisi beatae aut molestias asperiores necessitatibus aliquid quae veniam aspernatur quidem, architecto rerum expedita! Repudiandae, necessitatibus at.</p>

                </div>
                <div className={Style.aboutUs_box_founder}>
                    <div className={Style.aboutUs_box_founder_box}>
                        {
                            founderArray.map((el, i) => (
                                <div key={i + 1} className={Style.aboutUs_box_founder_box_img}>
                                    <Image src={el.image} alt={el.name}
                                        width={250}
                                        height={250}
                                        className={Style.aboutUs_box_founder_box_img}
                                    />
                                    <h3>{el.name}</h3>
                                    <p>{el.position}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={Style.aboutUs_box_title}>
                    <h2>Fast Factc</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, exercitationem facilis ratione sed nisi beatae aut molestias asperiores necessitatibus aliquid quae veniam aspernatur quidem, architecto rerum expedita! Repudiandae, necessitatibus at.</p>

                </div>

                <div className={Style.aboutUs_box_facts}>
                    <div className={Style.aboutUs_box_facts_box}>
                        {
                            factsArray.map((el , i)=>(
                                <div className={Style.aboutUs_box_facts_box_info} key={i+1}>
                                <h3>{el.title}</h3>
                                <p>{el.info}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Brand   />

        </div>
    )
}

export default aboutUs