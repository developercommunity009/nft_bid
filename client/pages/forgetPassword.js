import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import images from "../img";
import { Button } from "../components/componentIndex";
import { setError, openError } from "../Context/NFTMarketplaceContext";
import { forgetPasword, loginUser, registerUser } from "../features/user/userSlice";


const forgetPassword = () => {

  const dispatch = useDispatch();

  const {response} = useSelector((state)=> state.auth);
  console.log(response)
 
  const router = useRouter();

  // useEffect(() => {
  //   if (path === "/singUp") {
  //     setSignUp(true)
  //   } else if (path === "/login") {
  //     setSignUp(false);
  //   } else if (path === "/forgetPassword") {
  //     setForgetPass(true);
  //     setSignUp(false);
  //   }
  // }, [])



  const [data, setData] = useState({
    email: "",
  });


 




  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
      dispatch(forgetPasword(data));
    }

  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h2> Forget Password </h2>
    <br></br>
    <br></br>
    <br></br>
        <div className={Style.user}>
          <div className={Style.user_box}>
            <div className={Style.user_box_input_box}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="example@emample.com"
                onChange={handleChange} />
            </div>
            <br />
            <Button btnName="send request" classStyle={Style.button} handleClick={handleSubmit} />
         { response &&   <p className={Style.text}>Password-reset link send to your Email</p>}
          </div>
        </div>



        <p className={Style.login_box_para}>
        </p>
      </div>
    </div>
  );
}

export default forgetPassword