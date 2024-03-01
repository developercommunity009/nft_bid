import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
import { FaPercent } from 'react-icons/fa';
import { AiTwotonePropertySafety } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createTransaction, makeNFT } from '../features/nft/nftSlice';

//  INTERNAL IMPORT
import Style from "./upload.module.css";
import formStyle from "../Account/From/From.module.css";
import images from "../img";
import { Button } from '../components/componentIndex';
import { DropZone } from '../UploadNFT/uploadNFTIndex';
import { useDispatch, useSelector } from 'react-redux';
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';

const UploadNFT = ({ uploadToIpfs, createNFT, createNFTwithBidding , userId }) => {

    const { nftId, tokenURL , token , nftIdSend , transHash} = useContext(NFTMarkitplaceContext);

    const router = useRouter();
    const dispatch = useDispatch();

    const {trans} = useSelector((state) => state.nft);


    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [active, setActive] = useState(0);
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [biddingDuration, setbiddingDuration] = useState(null);
    const [royalties, setRoyalties] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [properties, setProperties] = useState("");
    const [category, setCategory] = useState(0);
    const [txnComplete, setTxnComplete] = useState(false);

    const txrnData =({
        txnhash:transHash,
        buyer: userId,
        nftId: nftId , 
        amount: price 
    })

    const NFTData = ({
        tokenId: nftId,
        tokenURL: tokenURL,
        metadata: {
            name: name,
            description: description,
            image: image
        },
        price: price,
        website: website,
        royalties: royalties,
        fileSize: fileSize,
        properties: properties,
        category: category,
        creator: userId,
        seller:userId,
        ownershipHistory:{
            owner:userId,
            transaction:trans?._id
        },
        startTime:  biddingDuration !== null ? new Date(Math.floor(Date.now() / 1000) * 1000)  :  "",
        endTime:   biddingDuration !== null ? new Date(Date.now() + biddingDuration * 1000)  : "",
    });

    useEffect(() => {
        if(transHash !== null){
            dispatch(createTransaction({ txrn:txrnData, token:token }));
            setTxnComplete(true)
        }
    }, [transHash])

    useEffect(() => {
        if(nftId !== null && txnComplete !== false){
            dispatch(makeNFT({ NFTData, token }));
            setTxnComplete(false)
        }
    }, [trans])
    



    const categoryArray = [
        {
            image: images.nft_image_1,
            category: "Sport"
        },
        {
            image: images.nft_image_2,
            category: "Art"
        },
        {
            image: images.nft_image_3,
            category: "Music"
        },
        {
            image: images.nft_image_1,
            category: "Digital"
        },
        {
            image: images.nft_image_3,
            category: "Time"
        },
    ]

 
// console.log(new Date(Date.now() + 7200 * 1000))
// console.log(new Date(Date.now() + biddingDuration * 1000)  )
// console.log(Math.floor(Date.now() / 1000)    )
// console.log(new Date(Math.floor(Date.now() / 1000) * 1000));

    


    return (
        <div className={Style.upload}>
            <DropZone
                title="JPG, PNG, WEBM, MAX, 100MB"
                heading="Drag & drop file"
                subHeading="or Browse media on your device"
                name={name}
                website={website}
                description={description}
                royalties={royalties}
                fileSize={fileSize}
                category={category}
                properties={properties}
                image={image}
                setImage={setImage}
                uploadToIpfs={uploadToIpfs}
            />
            <div className={Style.upload_box}>
                <div className={formStyle.From_box_input}>
                    <label htmlFor="nft">item Name</label>
                    <input type="text" name="" placeholder='codeVertix'
                        className={formStyle.From_box_input_userName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={formStyle.From_box_input}>
                    <label htmlFor="website">Website</label>
                    <div className={formStyle.Form_box_input_box}>
                        <div className={formStyle.Form_box_input_box_icon}>
                            <MdOutlineHttp />
                        </div>

                        <input type="text" name="" placeholder='codeVertix'
                            className={formStyle.From_box_input_userName}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>


                    <p className={Style.upload_box_input_para}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt tenetur, vero eos, fugiat, placeat laboriosam dolore tempora fuga quasi minima neque. Nostrum debitis quisquam quasi cumque tempore vitae dolorem ad.
                    </p>
                </div>


                <div className={formStyle.From_box_input}>
                    <label htmlFor="description">Description</label>
                    <textarea name="" id="" cols="30" rows="6" placeholder='somethink type yourself in few words'
                        onChange={(e) => setDescription(e.target.value)}  ></textarea>
                    <p>The description will be included on the item's details searchPage
                        understanding its image. Markdown syntax is supported</p>
                </div>


                <div className={formStyle.From_box_input}>
                    <label htmlFor="name">Chose collection</label>
                    <p className={Style.upload_box_input_para}>
                        Choose an existing collection or create a new one
                    </p>
                    <div className={Style.upload_box_slider_div}>
                        {
                            categoryArray.map((el, i) => (
                                <div key={i + 1} className={`${Style.upload_box_slider} ${active == i + 1 ? Style.active : ""}`}
                                    onClick={() => (setActive(i + 1), setCategory(el.category))}   >
                                    <div className={Style.upload_box_slider_box}>
                                        <div className={Style.upload_box_slider_box_img}>
                                            <Image src={el.image}
                                                alt='background image'
                                                width={70}
                                                height={70}
                                                className={Style.upload_box_slider_box_img_img}
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className={Style.upload_box_slider_box_img_icon}>
                                            <TiTick />
                                        </div>
                                    </div>
                                    <p>Crypto Legend - {el.category}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={formStyle.From_box_input_social}>
                    <div className={formStyle.From_box_input}>
                        <label htmlFor="royalties">Royalties</label>
                        <div className={formStyle.From_box_input_box}>
                            <div className={formStyle.From_box_input_box_icon}>
                                <FaPercent />
                            </div>
                            <input type="text" placeholder='20%' onChange={(e) => setRoyalties(e.target.value)} />
                        </div>
                    </div>


                    <div className={formStyle.From_box_input}>
                        <label htmlFor="size">Size</label>
                        <div className={formStyle.From_box_input_box}>
                            <div className={formStyle.From_box_input_box_icon}>
                                <MdOutlineAttachFile />
                            </div>
                            <input type="text" placeholder='165MB' onChange={(e) => setFileSize(e.target.value)} />
                        </div>
                    </div>


                    <div className={formStyle.From_box_input}>
                        <label htmlFor="properties">Properties</label>
                        <div className={formStyle.From_box_input_box}>
                            <div className={formStyle.From_box_input_box_icon}>
                                <AiTwotonePropertySafety />
                            </div>
                            <input type="text" placeholder='properties' onChange={(e) => setProperties(e.target.value)} />
                        </div>
                    </div>

                    <div className={formStyle.From_box_input}>
                        <label htmlFor="Price">Price</label>
                        <div className={formStyle.From_box_input_box}>
                            <div className={formStyle.From_box_input_box_icon}>
                                <AiTwotonePropertySafety />
                            </div>
                            <input type="number" placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                </div>
                    <div className={formStyle.From_box_input}>
                        <label htmlFor="duration">Bidding Time Durations</label>
                        <div className={formStyle.From_box_input_box}>
                            <div className={formStyle.From_box_input_box_icon}>
                                 <AiTwotonePropertySafety />
                            </div>
                            <input type="number" placeholder='If you want Create NFT with Time Duration then Write Time In Seconds' onChange={(e) => setbiddingDuration(e.target.value)} />
                        </div>
                    </div>


                <div className={Style.upload_box_btn}>
                    <Button btnName="List NFT" handleClick={async () => {
                        { / * <Button btnName="Upload" handleClick={async() =>{ dispatch(makeNFT({NFTData , token}));*/ }
                        createNFT(
                            name,
                            price,
                            image,
                            description,
                        )
                    }}
                        classStyle={Style.upload_box_btn_style} />

                    <Button btnName="List NFT Bidding" handleClick={async () => {
                         createNFTwithBidding(
                            name,
                            price,
                            image,
                            description,
                            biddingDuration
                         ) 
                        }}
                        classStyle={Style.upload_box_btn_style} />
                </div>

            </div>
        </div>
    )
}

export default UploadNFT;