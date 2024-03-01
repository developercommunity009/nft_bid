import React, { useState, useContext, useEffect } from 'react'


// INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from '../components/componentIndex';
import { SearchBar } from '../SearchPage/searchBarIndex';
import { Filter } from '../components/componentIndex';
import { Banner, NFTCardtwo } from '../collectionPage/collectionIndex';
import images from "../img"


//  IMPORT SMARTCONTRACT
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';


const searchPage = () => {

    const { fetchNFTs, setError } = useContext(NFTMarkitplaceContext);

    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    useEffect(() => {
        try {
            fetchNFTs().then((item) => {
                setNfts(item);
                setNftsCopy(item)
            });
        } catch {
            setError("Plesae Reload the Browser ! ")
        }


    }, [])

    const onHandleSerch = (value) => {
        const filteredNFT = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase()))

        console.log("filteredNFT =>", filteredNFT)

        if (filteredNFT.length === 0) {
            setNfts(nftsCopy)
        } else {
            setNfts(filteredNFT);
        }
    }

    const onClearSerch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    }

  console.log(nfts)


    // return (

    //     <div className={Style.searchPage}>
    //         <Banner bannerImage={images.creatorbackground2} />
    //         <SearchBar onHandleSerch={onHandleSerch} onClearSerch={onClearSerch} />
    //         <Filter />
    //         {nfts.length == 0
    //             ? <Loader />
    //             : <NFTCardtwo NFTData={nfts} />}
    //         <Slider />
    //         <Brand />
    //     </div>

    // )
}

export default searchPage