import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "../styles/auther.module.css";
import { Banner } from '../collectionPage/collectionIndex';
import { Brand, FollwerTab, Loader, Title } from '../components/componentIndex';
// import FollwerTabCardB from '../components/F0llwerTab/FollwerCard/FollwerCard';

import { AutherCardProfile, AutherTabs, AutherNFTCardBox } from '../autherPage/componentIndex';
import images from "../img";


//  SMART CONTRACT
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';
import { useDispatch, useSelector } from 'react-redux';
import { getTopCreators } from '../topCreator/topCreator';
import { getTotalNfts, nftsFromDetaBase, ownDelisted, ownNftDetaBase } from '../features/nft/nftSlice';


const auther = () => {
    const { fetchMyNFTsOrListedNFTs, currentAccount ,token} = useContext(NFTMarkitplaceContext);

    const dispatch = useDispatch();

    const { totalNFTs } = useSelector((state) => state.nft)
    const { nftOwnDb } = useSelector((state) => state.nft)
    const { ownDeListed } = useSelector((state) => state.nft)
    // const { nftfromDb } = useSelector((state) => state.nft)


    const [nfts, setNfts] = useState([]);
    const [mynfts, setMynfts] = useState([]);

    const [collectables, setCollectables] = useState(true);
    const [created, setCreated] = useState(false);
    const [collectablesDb, setCollectablesDb] = useState(false);
    const [createdDb, setCreatedDb] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollwing] = useState(false);

    const [nftsc, setNftsc] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    const [ownNftscDb, setownNftscDb] = useState([]);
    const [nftsDelisted, setNftsDelisted] = useState([]);
    const [creators, setCreators] = useState(null);

console.log(nftsDelisted);
    useEffect(() => {
        dispatch(getTotalNfts());
        dispatch(ownNftDetaBase(token));
        dispatch(ownDelisted(token));
        console.lo("LISTED")
    }, [])

    useEffect(() => {
        setNftsc(totalNFTs);
        setNftsCopy(totalNFTs);
        setownNftscDb(nftOwnDb);
        setNftsDelisted(ownDeListed);
    }, [totalNFTs])

    useEffect(() => {
        setTimeout(() => {
            setCreators(getTopCreators(nftsc));
        }, 1000);
    }, [nftsc])

// console.log(nftOwnDb)
// console.log(ownDeListed)


    useEffect(() => {
        fetchMyNFTsOrListedNFTs("fetchItemsListed").then((item) => {
            setNfts(item);
        })
    }, []);


    useEffect(() => {
        fetchMyNFTsOrListedNFTs("fetchMynfts").then((item) => {
            setMynfts(item);
        })
    }, []);


    // nftsFromDetaBase

    return (
        <div className={Style.auther}>


            <Banner bannerImage={images.creatorbackground2} />


            <AutherCardProfile currentAccount={currentAccount} />


            <AutherTabs
                setCollectables={setCollectables}
                setCreated={setCreated}
                setCollectablesDb={setCollectablesDb}
                setCreatedDb={setCreatedDb}
                setLike={setLike}
                setFollower={setFollower}
                setFollwing={setFollwing} />


            <AutherNFTCardBox
                collectables={collectables}
                created={created}
                collectablesDb={collectablesDb}
                createdDb={createdDb}
                like={like}
                follower={follower}
                following={following}
                nfts={nfts}
                mynfts={mynfts}
                nftsc={nftsc}
                ownNftscDb={ownNftscDb}
                nftsDelisted={nftsDelisted}
            />

    {/*creators ? <FollwerTab TopCreator={creators} /> : <Loader />*/}

            <Brand />
        </div>
    )
}

export default auther
