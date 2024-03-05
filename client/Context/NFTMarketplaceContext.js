import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Web3Model from "web3modal";
import { ethers } from 'ethers';
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";



// config for upload IPFS File & Imges
const projectId = "2XQdZnzmeBfPCMMaGWq8GnagfPw";
const projectSecrtKey = "7b281e41879edc7f80f50127f484eb34";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecrtKey}`).toString("base64")}`;

const subdomain = "https://codevvertix-nftmarketplace.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    }
})







//  INTERNAL IMPORT
import { NFTMarkitplaceAddress, NFTMarkitplaceABI } from "./constants";
import { useSelector } from 'react-redux';



// --------- FATCH THE SMART CONTRACT 
const fetchContract = (singerOrPervider) =>
    new ethers.Contract(NFTMarkitplaceAddress, NFTMarkitplaceABI, singerOrPervider);


// ---------- CONNECTING WITH SMAART CONTRACT
const connectingWithSmartContract = async () => {
    try {
        const web3Model = new Web3Model();
        const connectons = await web3Model.connect();
        const provider = new ethers.providers.Web3Provider(connectons);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;

    } catch (error) {
        console.log("Something went wrong while Connecting with smarat Contract =>", error);
    }
}


export const NFTMarkitplaceContext = React.createContext();

export const NFTMarkitplaceProvider = (({ children }) => {


    // ---------- USESTATES
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [selectedUrl, setSelectedUrl] = useState(false);
    const [nftId, setNftId] = useState(null);
    const [transHash, setTransHash] = useState(null);
    const [saleNFT, setSaleNFT] = useState(false);
    const [saleNFTBid, setSaleNFTBid] = useState(false);
    const [saleNFTId, setSaleNFTId] = useState("");
    const [buyNftHash, setBuyNftHash] = useState(null);
    const [nftIdSend, setNftIdSend] = useState(false);
    const [tokenURL, setTokenURL] = useState("");
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [bidAction, setBidAction] = useState(false);
    const [reSellWithBid, serReSellWithBid] = useState(false);
    const router = useRouter();
    const { logedInuser } = useSelector((state) => state.auth)

    useEffect(() => {
        const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        const config = {
            headers: {
                Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
                    }`,
                Accept: "application/json",
            },
        };
        setToken(config);
        setUserId(getTokenFromLocalStorage?.user?._id);
    }, [logedInuser])

    const updateInfo = () => {
        axios.patch("http://localhost:3001/api/v1/users/updateme", data, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then((e) => { console.log(e); router.push("/") })
            .catch((e) => console.log(e));
    }

    const checkContract = async () => {
        await connectingWithSmartContract();
    }

    // ---------- CHECK WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return (setOpenError(true), setError("InstallMetaMask"))

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                setError("No Account Found");
                setOpenError(true)
            }
        } catch (error) {
            setError("Something went wrong while Connecting with smarat Contract");
            setOpenError(true)
        }
    }



    // --------- CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return (setError("InstallMetaMask"), setOpenError(true));

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setCurrentAccount(accounts[0]);

        } catch (error) {
            setError("Something went wrong while Connecting with smarat Contract");
            setOpenError(true);
        }
    }


    // ---------  UPLOAD TO IPFS FUNCTION
    const uploadToIpfs = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            setError("Error in Upload  to IPFS ");
            setOpenError(true)
        }
    }


    // --------- CREATE NFT
    const createNFT = async (name, price, image, description) => {

        if (!name || !description || !price || !image) return (setError("Data is Missing!"), setOpenError(true))
        const data = JSON.stringify({ name, description, image });
        try {
            const added = await client.add(data);
            const url = `${subdomain}/ipfs/${added.path}`;
            setTokenURL(url);
            await createSale(url, price);
            // router.push("/searchPage");
            console.log("url  =>", url)
        } catch (error) {
            setError("Error while Creating NFTs");
            setOpenError(true)
        }
    }

      //  ----------- CREATESALE FUNCTION
      const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice();

            const transcation = !isReselling ? await contract.createToken(url, price, {
                value: listingPrice.toString()
            }) : await contract.reSellToken(id, price, {
                value: listingPrice.toString()
            })
            console.log("Enter")


            const receipt = await transcation.wait();
            console.log(receipt);
            // Find the event that contains the token ID
            const event = receipt.events.find((e) => e.event === 'Transfer');
            console.log(event);
            setTransHash(event.transactionHash);
            if (event) {
                const tokenIdGet = event.args[2];
                const tokenId = tokenIdGet.toString();
                console.log('Token ID:', tokenId);
                setNftId(tokenId);
                setNftIdSend(true);
            }

            //============================================================================================
            // await transcation.wait();
            // console.log(transcation);
            // if (transcation) {
            //     // const address = "0xF41E74F556258d1D1E978156B6174479049cb5Cf";
            //     // const apikey = "FUWX12CI53RS6FHGMM3H7ADTT5XGUFJA3B";
            //     const txn = await axios.get("https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x47476B9BcD9c04bd1F714dbe927eFB519102a46C&page=1&offset=100&tag=latest&apikey=FUWX12CI53RS6FHGMM3H7ADTT5XGUFJA3B");
            //     const getTxn = txn?.data?.result;
            //     const revertResult = getTxn.reverse();;
            //     setTransHash(revertResult[0]?.hash);
            //     setNftId(revertResult[0]?.tokenID);
            //     setNftIdSend(true);
            // }


        } catch (error) {
            setError("Error while Creating Sale");
            setOpenError(true)
        }
    }

    // --------- CREATE NFT WITH BIDDING
    const createNFTwithBidding = async (name, price, image, description , biddingDuration) => {

        if (!name || !description || !price || !image || !biddingDuration) return (setError("Data is Missing!"), setOpenError(true))
        const data = JSON.stringify({ name, description, image });
        try {
            const added = await client.add(data);
            const url = `${subdomain}/ipfs/${added.path}`;
            setTokenURL(url);
            const nftBidData={
                tokenURI:url,
                price,
                bidDuration:biddingDuration,
            }
            await createSaleWithBidding(nftBidData);
            // router.push("/searchPage");
            console.log("url  =>", url)
        } catch (error) {
            setError("Error while Creating NFTs by Bidding");
            setOpenError(true)
        }
    }


    //  ----------- CREATESALE FUNCTION WITH BIDDING
    const createSaleWithBidding = async (nftBidData) => {

       const {tokenURI,price,bidDuration,reSellStatus,id}=nftBidData;
        console.log( tokenURI,price,bidDuration,reSellStatus,id);
        try {
            const pricefee = ethers.utils.parseUnits(price, "ether");
            console.log(pricefee)
            const contract = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice();
            const transcation = !reSellStatus ? await contract.sellNftByBidding(tokenURI, pricefee, bidDuration ,  {
                value: listingPrice.toString()
            }) : await contract.reSellNftByBidding(id, pricefee, bidDuration,{
                value: listingPrice.toString()
            })
            console.log(transcation)
            console.log("Enter")

            const receipt = await transcation.wait();
            console.log(receipt);
            // Find the event that contains the token ID
            const event = receipt.events.find((e) => e.event === 'Transfer');
            setTransHash(event.transactionHash);
            if (event) {
                const tokenIdGet = event.args[2];
                const tokenId = tokenIdGet.toString();
                setNftId(tokenId);
                setNftIdSend(true);
           }
           if(reSellStatus){
            serReSellWithBid(true)
           }

        } catch (error) {
            setError("Error while Creating Sale With Bidding");
            setOpenError(true)
        }
    }


    //  ----------- FETCHNFT FUNCTION 
    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarkitItem();
            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner,
                    price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    // console.log("tokenURI => ", tokenURI);
                    const { data: { name, description, image }, } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }

                })
            );

            return items;

        } catch (error) {
            setError("Error While fetching NFTs");
            setOpenError(true)
        }
    }

    // useEffect(() => {
    //     fetchNFTs();
    // }, []);


    // ------------ FETCH MY NFT OR LISTED NFTs
    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            const contract = await connectingWithSmartContract();
            const data = type == "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFT();
            const item = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {

                    const tokenURI = await contract.tokenURI(tokenId);

                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,

                    }
                })
            );

            return item;

        } catch (error) {
            setError("Error While fetchMyNFTsOrListedNFTs");
            setOpenError(true)
        }
    }

    // useEffect(() => {
    //     fetchMyNFTsOrListedNFTs();
    // }, [])

    // ------------  BUY NFT FUNCTION
    const buyNFT = async (nft) => {
        console.log(nft)
        try {
            const contract = await connectingWithSmartContract();
            console.log(contract);
            console.log(nft.price);
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            console.log(price)
            console.log(nft.tokenId);
            const transcation = await contract.createMarkitSale(nft.tokenId, {
                value: price,
            });
            console.log(transcation);
            await transcation.wait();
            console.log(transcation);
            if (transcation) {
                setSaleNFT(true);
                setSaleNFTId(nft?._id);
                setBuyNftHash(transcation.hash) // check with console.log()
            }

            // router.push("/auther");
        } catch (error) {
            setError("Error while BuyNFT");
            setOpenError(true)
        }
    }

    // ------------  BUY NFT FUNCTION WITH BIDDING
    const buyNFTWithBidding = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            console.log(contract);
            const bidding = ethers.utils.parseUnits(nft.biddingValue.toString(), "ether");
            const transcation = await contract.buyNftByBidding(nft.nftId, {
                value: bidding,
            });
            console.log(transcation);
            await transcation.wait();
            console.log(transcation);
            if (transcation) {
                setBidAction(true);
            }
        } catch (error) {
            setError("Error while BuyNFT");
            setOpenError(true)
        }
    }
    // ------------  FINALAZE BIDDING
    const finalaizeBidding = async (id) => {
        try {
            const contract = await connectingWithSmartContract();
            console.log(contract);
            const transcation = await contract.finalizeBidding(id);
            await transcation.wait();
            console.log(transcation);
            if (transcation) {
                setBuyNftHash(transcation.hash) // check with console.log()
                setSaleNFTBid(true);
            }
        } catch (error) {
            setError("Error while Finalize Bidding");
            setOpenError(true)
        }
    }
    // ------------  REFUND BIDDING 
    const refundBidding = async (id) => {
        console.log(id);
        try {
            const contract = await connectingWithSmartContract();
            console.log(contract);
            const transcation = await contract.refundBid(id);
            console.log(transcation);
        } catch (error) {
            setError("Error while refund Bidding");
            setOpenError(true)
        }
    }

    return (
        <NFTMarkitplaceContext.Provider value={{
            connectingWithSmartContract,
            connectWallet,
            checkIfWalletConnected,
            uploadToIpfs,
            createNFT,
            createNFTwithBidding, //
            createSaleWithBidding, //
            fetchMyNFTsOrListedNFTs,
            fetchNFTs,
            buyNFT,
            buyNFTWithBidding, // 
            checkContract,
            currentAccount,
            createSale,
            setOpenError,
            error,
            setError,
            openError,
            updateInfo,
            token,
            userId,
            setSelectedUrl,
            nftId,
            tokenURL,
            nftIdSend,
            transHash,
            saleNFT,
            saleNFTId,
            buyNftHash,
            finalaizeBidding, //
            refundBidding, //
            bidAction, 
            saleNFTBid,
            reSellWithBid

        }}>
            {children}
        </NFTMarkitplaceContext.Provider>
    )
})

