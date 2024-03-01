import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import images from "../img";
import { Button } from "../components/componentIndex";
import { setError, openError, NFTMarkitplaceContext } from "../Context/NFTMarketplaceContext";
import {  googleLogIn, loginUser, registerUser } from "../features/user/userSlice";



import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react"

const loginSechmema = yup.object({
  email: yup.string().email("Should be Valid Email").required("email is required!"),
  password: yup.string().required("password is required!"),
})




const login = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const {data : session} =useSession();

  const {setGoogleUser} = useContext(NFTMarkitplaceContext);

  const [activeBtn, setActiveBtn] = useState(1);
  const [isSignUp, setSignUp] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);

  const { logedInuser } = useSelector((state) => state.auth)
  const { googleUser } = useSelector((state) => state.auth)
  

  useEffect(() => {
    if (logedInuser){
      router.push("/");
    }else if(googleUser !== undefined){
      router.push("/");
    }
  }, [logedInuser , googleUser ])

  useEffect(()=>{
  dispatch((googleLogIn({email:session?.user?.email , name : session?.user?.name})))
  },[session])

  async function handleGoogleSinIn(){
    signIn('google');
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSechmema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    }
  })



  const socialImage = [
    {
      social: images.google,
      name: "Continue with Google",
    },
    // {
    //   social: images.twitter,
    //   name: "Continue with twitter",
    // },
    // {
    //   social: images.facebook,
    //   name: "Continue with Facebook",
    // },
  ];


  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Login</h1>

        <div className={Style.user}>
          <div className={Style.user_box}>
            <div className={Style.user_box_social}>
              {socialImage.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => {setActiveBtn(i + 1); handleGoogleSinIn()} }
                  className={`${Style.user_box_social_item} ${activeBtn == i + 1 ? Style.active : ""
                    }`}
                >
                  <Image
                    src={el.social}
                    alt={el.name}
                    width={30}
                    height={30}
                    className={Style.user_box_social_item_img}
                  />
                  <p>
                    <span>{el.name}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className={Style.user_box_or}>OR</p>
            <form action="" onSubmit={formik.handleSubmit} >
              <div className={Style.user_box_input}>
                <div className={Style.user_box_input_box}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className={Style.user_box_input_box}>
                  <label
                    htmlFor="password"
                    className={Style.user_box_input_box_label}
                  >
                    <p>Password</p>
                    <p>
                      <Link href="/forgetPassword">{forgetPass ? " " : "Forget password"}</Link>
                    </p>

                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
              </div>
              <div className={Style.user_box_input_box}>
                <button
                  type="submit"
                  className={Style.button}
                >Send Request</button></div>
            </form>
          </div>
        </div>
        <p className={Style.login_box_para}>
          New user? <Link href="/signUp">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default login;