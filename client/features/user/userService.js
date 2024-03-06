import axios from "axios";
import { base_url } from "../../utils/base_url";

const singUp = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/auth/singup`, userData);
    if (response.data) {
        return response.data;
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/auth/login`, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data;
    }
}


const updateInfo = async (userData) => {
    const { token, values } = userData;
    const response = await axios.patch(`${base_url}/api/v1/users/updateme`, values, token);
    if (response.data) {
        return response.data;
    }
}

const uploadImg = async (userImg) => {
    console.log(userImg);
    const response = await axios.post(`${base_url}/api/v1/upload`, userImg);
    if (response.data) {
        return response.data;
    }
}

const getSingalUser = async (userData) => {
    console.log(userData)
    const { token, id } = userData;
    const response = await axios.get(`${base_url}/api/v1/users/singal/${id}`, token);
    if (response.data) {
        return response.data;
    }
}

const forgetPass = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/auth/forgetpassword`, userData);
    if (response.data) {
        return response.data;
    }
}

const resetPasword = async (userData) => {
    const { token, data } = userData;
    const response = await axios.patch(`${base_url}/api/v1/auth/resetpassword/${token}`, data);
    if (response.data) {
        return response.data;
    }
}

const updatePsasword = async (userData) => {
    const { token, data } = userData;
    const response = await axios.patch(`${base_url}/api/v1/auth/updatingpassword`, data, token);
    if (response.data) {
        return response.data;
    }
}



const contactEmail = async (userData) => {
    const { token, values } = userData;
    const response = await axios.post(`${base_url}/api/v1/users/contactmail`, values, token);
    if (response.data) {
        return response.data;
    }
}

const userEmail = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/users/usermail`, userData);
    if (response.data) {
        return response.data;
    }
}

const googleLoginUser = async (userData) => {
    const response = await axios.post(`${base_url}/api/v1/auth/googleuser`, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data;
    }
}

const followingUnFollowing = async (userData) => {
    console.log("Enter");
    const {userId , token} = userData;
    const response = await axios.put(`${base_url}/api/v1/auth/following`, {userId} , token);
    if (response.data) {
        return response.data.message;
    }
}




const authService = {
    singUp,
    login,
    updateInfo,
    uploadImg,
    getSingalUser,
    forgetPass,
    resetPasword,
    updatePsasword,
    contactEmail,
    userEmail,
    googleLoginUser,
    followingUnFollowing
}

export default authService;
