import React, { useContext, useEffect, useState } from "react";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection, Services, BigNftSlider, Subscribe, Title,
  Catagory, Filter, NFTCard, Collection, FollwerTab, AudioLive,
  Slider, Brand, Vedio, Loader
} from "../components/componentIndex";
import { getTopCreators } from "../topCreator/topCreator";


//  IMPORT CONTRACT-DATA
import { NFTMarkitplaceContext } from "../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTotalNfts, nftsFromDetaBase } from "../features/nft/nftSlice";




const Home = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { totalNFTs } = useSelector((state) => state.nft)
  const { nftfromDb } = useSelector((state) => state.nft)


  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [creators, setCreators] = useState(null);

 

  //   here fetchNFTs function from blockChain Side  data fetching
  // const { fetchNFTs } = useContext(NFTMarkitplaceContext);
  // useEffect(() => {
  //   fetchNFTs().then((item) => {
  //     setNfts(item.reverse());
  //     setNftsCopy(item)
  //   });
  // }, []);

  // useEffect(()=>{
  //   fetchNFTs();
  // })

  // CREATORS LIST
  // console.log(nfts);
  useEffect(() => {
    dispatch(nftsFromDetaBase());
  },[])

  useEffect(() => {
    setNfts(nftfromDb);
    setNftsCopy(nftfromDb);
  }, [nftfromDb])

   useEffect(()=>{
    setTimeout(() => {
      setCreators(getTopCreators(nfts));
    }, 1000);
   },[nfts])


  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Services />
      <BigNftSlider />
      <Title heading="Audio Collection"
        paragraph="Discover the most outsading NFTs in all topics of life" />
      <AudioLive />
  {   creators ? <FollwerTab TopCreator={creators} />  : <Loader />   }
  

      <Slider />
      <Collection />
      <Title heading="Featured NFTs"
        paragraph="Discover the most outsading NFTs in all topics of life" />
      <Filter />
      {nfts ?
        <NFTCard NFTCard={nfts} />
        : <Loader />}

      <Title heading="Browse The Category"
        paragraph="Explore the NFT's in the most featured category" />
      <Catagory />
      <Subscribe />
      <Brand />
      <Vedio />
    </div>
  );
};

export default Home;
