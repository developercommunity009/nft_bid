import React,{useEffect , useState , useContext} from 'react'
import { useRouter } from 'next/router';

//  INTERNAL IMPORT
import Style from "../styles/NFTdetails.module.css";
import { Button , Catagory , Brand} from "../components/componentIndex";
import NFTdetailsPage from '../NFTdetailsPage/NFTdetailsPage';


//   IMPORT SMART CONTRACT DATA
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';


const NFTdetails = () => {

  const {currentAccount } = useContext(NFTMarkitplaceContext);

  const [nft  , setNft] = useState({
    image:"",
    tokenId:"",
    name :"",
    owner:"",
    price:"",
    seller:"",
    description:""
  });
  const router = useRouter();
  
  
  useEffect(()=>{
    if(!router.isReady) return;
    setNft(router.query);
  },[router.isReady])

  

  return (

    <div>

    <NFTdetailsPage nft={nft}  />
    <Catagory />
    <Brand  />
    
    </div>
  )
}

export default NFTdetails;