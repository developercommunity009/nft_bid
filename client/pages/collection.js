import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "../styles/collecion.module.css";
import images from "../img";
import { Banner, CollectionProfile, NFTCardtwo } from '../collectionPage/collectionIndex';
import { Slider, Brand } from '../components/componentIndex';
import Filter from "../components/Filter/Filter";
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalNfts, nftsFromDetaBase } from '../features/nft/nftSlice';
import NFTCardtwoB from '../collectionPage/NFTCardtwoB/NFTCardtwoB';

const collection = () => {

  const dispatch = useDispatch();

  // const { fetchNFTs } = useContext(NFTMarkitplaceContext);
  const { totalNFTs } = useSelector((state) => state.nft)
  const { nftfromDb } = useSelector((state) => state.nft)

  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);


  // useEffect(() => {
  //   dispatch(getTotalNfts());
  // }, [])

  useEffect(() => {
    dispatch(nftsFromDetaBase());
  },[])

  useEffect(() => {
    setNfts(nftfromDb);
    setNftsCopy(nftfromDb);
  }, [nftfromDb])




  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ]

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardtwoB NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  )
}

export default collection