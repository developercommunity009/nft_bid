import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/user/userSlice";
import nftSlice from '../features/nft/nftSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nft:nftSlice,
    }
})
