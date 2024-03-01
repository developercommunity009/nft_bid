import axios from "axios";
import { base_url } from "../../utils/base_url";

const createNFT = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/nfts`, userData.NFTData , userData.token);
    if (response.data) {
        return response.data;
    }
}

const transaction = async (txrnData) => {
         const {txrn , token}=txrnData
    const response = await axios.post(`${base_url}/api/v1/trx/transactions`, txrn , token)
    if (response.data) {
        return response.data;
    }
}

const getTransaction = async (userData) => {
    
    const response = await axios.get(`${base_url}/api/v1/trx/transactions/${xrnData.nftId}`, userData.token);
    if (response.data) {
        return response.data;
    }
}

const getAllNftNFT = async () => {
    const response = await axios.get(`${base_url}/api/v1/nfts/totalnfts`);
    // const response = await axios.get(`${base_url}/api/v1/nfts/`);
    if (response.data) {
        return response.data;
    }
}

const getSingalNFT = async (userData) => {
    console.log(userData)
    const response = await axios.get(`${base_url}/api/v1/nfts/${userData.id}`, userData.token);
    if (response.data) {
        return response.data;
    }
}
const whishList = async (userData) => {
    const { nftId ,token } = userData;
    const response = await axios.put(`${base_url}/api/v1/auth/whislist`, {nftId}, token);
    if (response.data) {
        return response.data.message;
    }
}

const views = async (userData) => {
    const { nftId , token } = userData;
    const response = await axios.put(`${base_url}/api/v1/nfts/view`, {nftId}, token);
    if (response.data) {
        return response.data.message;
    }
}


const rating = async (userData) => {
    const { nftId , star ,token } = userData;
    const response = await axios.put(`${base_url}/api/v1/nfts/rating`, {nftId , star}, token);
    if (response.data) {
        return response.data.message;
    }
}

const buyNft = async (userData) => {
    const{id , ownerData , token }= userData;
    console.log(id , ownerData ,  token);
    const response = await axios.put(`${base_url}/api/v1/nfts/buynft/${id}` , {ownerData} ,  token);
    if (response.data){
        return response.data;
    }
}

const reSaleNfts = async (userData) => {
    const{id , token , price }= userData;
    console.log(id ,price , token);
    const response = await axios.post(`${base_url}/api/v1/nfts/buynft/${id}` , {price} ,  token);
    if (response.data) {
        return response.data;
    }
}

const nftsFromDb = async () => {
    const response = await axios.get(`${base_url}/api/v1/nfts/totalnftsdb`);
    if (response.data) {
        return response.data.nfts;
    }
}

const ownNftDb = async (token) => {
    console.log(token)
    const response = await axios.get(`${base_url}/api/v1/nfts/usernfts` , token);
    if (response.data) {
        return response.data.nfts;
    }
}

const ownDelistedNft = async (token) => {
    console.log(token)
    const response = await axios.get(`${base_url}/api/v1/nfts/userdelistednfts`,  token);
    if (response.data) {
        return response.data.nfts;
    }
}

const nftBid = async (nftData) => {
    const {id , amount , bidder , token }= nftData
    // console.log(id , amount , bidder , token)
    const response = await axios.post(`${base_url}/api/v1/nfts/bids/${id}`, {bidder, amount} , token);
    if (response.data) {
        return response.data;
    }
}


const finalizebid = async (nftData) => {
    const {id  , ownerData , token }= nftData
    console.log(id  , ownerData , token)
    const response = await axios.put(`${base_url}/api/v1/nfts/finalizebid/${id}`, {ownerData} , token);
    if (response.data) {
        return response.data;
    }
}

const reSellByBid = async (nftData) => {
    const { price , endingTime , id , token}= nftData
    console.log( price , endingTime , id , token )
    const response = await axios.post(`${base_url}/api/v1/nfts/resellbybid/${id}`, { endingTime , price} , token);
    if (response.data) {
        return response.data;
    }
}

const nftService = {
    createNFT,
    getAllNftNFT,
    getSingalNFT,
    whishList,
    views,
    rating,
    transaction,
    getTransaction,
    buyNft,
    nftsFromDb,
    ownNftDb,
    ownDelistedNft,
    reSaleNfts,
    nftBid,
    finalizebid,
    reSellByBid
    
}

export default nftService;
