import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";



// const getcoustomer = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;


export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {

    try {
        return await authService.singUp(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const updateUser = createAsyncThunk("auth/update-User", async (userData, thunkAPI) => {
    try {
        return await authService.updateInfo(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const uploadImge = createAsyncThunk("img/upload", async (userData, thunkAPI) => {
    try {
        return await authService.uploadImg(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSinglUser = createAsyncThunk("auth/singal-User", async (userData, thunkAPI) => {
    try {
        return await authService.getSingalUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgetPasword = createAsyncThunk("auth/forget-Password", async (userData, thunkAPI) => {
    try {
        return await authService.forgetPass(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetPassword = createAsyncThunk("auth/reset-Password", async (userData, thunkAPI) => {
    try {
        return await authService.resetPasword(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const updatePssword = createAsyncThunk("auth/update-Password", async (userData, thunkAPI) => {
    try {
        return await authService.updatePsasword(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const contactEmailCreate = createAsyncThunk("user/contact-Mail", async (userData, thunkAPI) => {
    try {
        return await authService.contactEmail(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const userEmailCreate = createAsyncThunk("user/user-Mail", async (userData, thunkAPI) => {
    try {
        return await authService.userEmail(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const googleLogIn = createAsyncThunk("user/google-User", async (userData, thunkAPI) => {
    try {
        return await authService.googleLoginUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const followingUnFollowingUser = createAsyncThunk("user/F&UNF-User", async (userData, thunkAPI) => {
    try {
        return await authService.followingUnFollowing(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})






const initialState = {
    user: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info("registred user Succeccfuly");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.logedInuser = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info("user LoggedIn");
                }

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                toast.info("user Updated");
                state.message = "success";

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(uploadImge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.uploadImage = action.payload;
                state.message = "success";

            })
            .addCase(uploadImge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(getSinglUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.logedInUser = action.payload;
                state.message = "success";

            })
            .addCase(getSinglUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.logedInUser = undefined
                state.message = action.error;

            })
            .addCase(forgetPasword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgetPasword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.response = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info(action.payload);
                }

            })
            .addCase(forgetPasword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }

            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.response = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info(action.payload);
                }

            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(updatePssword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePssword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedPass = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info("Password Chanded Successfully");
                }

            })
            .addCase(updatePssword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.updatedPass = undefined;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(contactEmailCreate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(contactEmailCreate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contactEmailCreated = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info("Send Successfully");
                }

            })
            .addCase(contactEmailCreate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.contactEmailCreated = undefined;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(userEmailCreate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userEmailCreate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userEmailCreated = action.payload;
                state.message = "success";

            })
            .addCase(userEmailCreate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.userEmailCreated = undefined;
            })
            .addCase(googleLogIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(googleLogIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.googleUser = action.payload;
                state.message = "success";
                if (state.isSuccess === true) {
                    toast.info("User LogedIn From google");
                }
            })
            .addCase(googleLogIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.googleUser = undefined;
            })
            .addCase(followingUnFollowingUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(followingUnFollowingUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.followUnfollow = action.payload;
                state.message = "success";
                if (state.followUnfollow === "unfollowed") {
                    toast.info("Unfollow");
                }else if(state.followUnfollow === "followed") {
                    toast.info("Follow");
                }
            })
            .addCase(followingUnFollowingUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.googleUser = undefined;
            })
    }

})


export default authSlice.reducer;