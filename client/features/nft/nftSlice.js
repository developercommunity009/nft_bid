import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nftService from "./nftServices";
import { toast } from "react-toastify";



export const makeNFT = createAsyncThunk("nft/created", async (userData, thunkAPI) => {
    try {
        return await nftService.createNFT(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getTotalNfts = createAsyncThunk("nft/total-NFTs", async (thunkAPI) => {
    try {
        return await nftService.getAllNftNFT();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSingalNft = createAsyncThunk("nft/singal-NFTs", async (userData, thunkAPI) => {
    try {
        return await nftService.getSingalNFT(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const whislist = createAsyncThunk("nft/whislist", async (userData, thunkAPI) => {
    try {
        return await nftService.whishList(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const viewsUser = createAsyncThunk("nft/views", async (userData, thunkAPI) => {
    try {
        return await nftService.views(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const nftRating = createAsyncThunk("nft/rating", async (userData, thunkAPI) => {
    try {
        return await nftService.rating(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createTransaction = createAsyncThunk("txrn/create", async (txrnData, thunkAPI) => {
    try {
        return await nftService.transaction(txrnData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getSingalTransaction = createAsyncThunk("txrn/get-Singal", async (txrnData, thunkAPI) => {
    try {
        return await nftService.getTransaction(txrnData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const buyNftFun = createAsyncThunk("nft/buy", async (txrnData, thunkAPI) => {
    try {
        return await nftService.buyNft(txrnData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const reSaleNf = createAsyncThunk("nft/reSaleNfts", async (txrnData, thunkAPI) => {
    try {
        return await nftService.reSaleNfts(txrnData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const nftsFromDetaBase = createAsyncThunk("nft/nftsFromDb", async ( thunkAPI) => {
    try {
        return await nftService.nftsFromDb();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const ownNftDetaBase = createAsyncThunk("nft/ownNftDb", async (token, thunkAPI) => {
    try {
        return await nftService.ownNftDb(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const ownDelisted = createAsyncThunk("nft/ownDelistedNft", async (token, thunkAPI) => {
    try {
        return await nftService.ownDelistedNft(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const nftBiding = createAsyncThunk("nft/bid", async (nftData, thunkAPI) => {
    try {
        return await nftService.nftBid(nftData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const finalizeBidd = createAsyncThunk("nft/finalizeB", async (nftData, thunkAPI) => {
    try {
        return await nftService.finalizebid(nftData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const reSellByBiding = createAsyncThunk("nft/reSellBid", async (nftData, thunkAPI) => {
    try {
        return await nftService.reSellByBid(nftData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



const initialState = {
    nft: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const nftSlice = createSlice({
    name: "nft",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeNFT.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(makeNFT.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.nft = action.payload;
                toast.info("create NFT Succeccfuly");
                state.message = "success";
            })
            .addCase(makeNFT.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(getTotalNfts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTotalNfts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.totalNFTs = action.payload;
                state.message = "success";
            })
            .addCase(getTotalNfts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(getSingalNft.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingalNft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singalNFTs = action.payload;
                state.message = "success";
            })
            .addCase(getSingalNft.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(whislist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(whislist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.whisList = action.payload;
                if (state.whisList === "removeWhislist NFT") {
                    toast.info("removeWhislist");
                } else if (state.whisList === "addWhislist NFT") {
                    toast.info("addWhislist");
                }
            })
            .addCase(whislist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(viewsUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(viewsUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.view = action.payload;
            })
            .addCase(viewsUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(nftRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(nftRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rated = action.payload;
                if (state.rated === "nft rated") {
                    toast.info(" NFT Rated Successfully")
                }
            })
            .addCase(nftRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.trans = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("Trnx Successfully")
                }
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(getSingalTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingalTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singaltrans = action.payload;
            })
            .addCase(getSingalTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(buyNftFun.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(buyNftFun.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.buyedNFT = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("BUY NFT Successfully")
                }
            })
            .addCase(buyNftFun.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(nftsFromDetaBase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(nftsFromDetaBase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.nftfromDb = action.payload;
            })
            .addCase(nftsFromDetaBase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(ownNftDetaBase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ownNftDetaBase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.nftOwnDb = action.payload;
            })
            .addCase(ownNftDetaBase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(ownDelisted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ownDelisted.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ownDeListed = action.payload;
            })
            .addCase(ownDelisted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(reSaleNf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reSaleNf.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.reSaled = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("ReSell NFT Successfully")
                }
            })
            .addCase(reSaleNf.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;

            })
            .addCase(nftBiding.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(nftBiding.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bidnft = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("Bidding NFT Successfully")
                }
            })
            .addCase(nftBiding.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true && state.isSuccess === false) {
                    toast.error("Bidding NFT Failed")
                }
            })
            .addCase(finalizeBidd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(finalizeBidd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.finalizedBid = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("Bidding finalized Successfully")
                }
            })
            .addCase(finalizeBidd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(reSellByBiding.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reSellByBiding.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.reSellBid = action.payload;
                if (state.isError === false && state.isSuccess === true) {
                    toast.info("ReSell NFT Successfully")
                }
            })
            .addCase(reSellByBiding.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            
            })

    }

})


export default nftSlice.reducer;