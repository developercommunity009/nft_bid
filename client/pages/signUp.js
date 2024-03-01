import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";


//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import images from "../img";
import { Button } from "../components/componentIndex";
import { registerUser } from "../features/user/userSlice";
import { setError, openError } from "../Context/NFTMarketplaceContext";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const signUpSechmema = yup.object({
  name: yup.string().required("name is required!"),
  email: yup.string().email("Should be Valid Email").required("email is required!"),
  password: yup.string().required("password is required!"),
  confrimPassword: yup.string().required("confrimPassword is required!"),
})

const signUp = () => {


  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState(1);
  const router = useRouter();

  const {user} = useSelector((state) => state.auth)
  
  useEffect(()=>{
    if(user){
      router.push("/login")
    }
  },[user])
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confrimPassword: ""
    },
    validationSchema: signUpSechmema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    }
  })



  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>SignUp</h1>
        <div className={Style.user}>
          <div className={Style.user_box}>
            {/*<p className={Style.user_box_or}>OR</p>*/}
            <form action="" onSubmit={formik.handleSubmit} >
              <div className={Style.user_box_input}>
                <div className={Style.user_box_input_box}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter youe name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                     />
                    <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div> 
                </div>
                <div className={Style.user_box_input_box}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@emample.com"
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

                <div className={Style.user_box_input_box}>
                  <label
                    htmlFor="confrimPassword"
                    className={Style.user_box_input_box_label}
                  >
                    <p>Confrim Password</p>

                  </label>
                  <input
                    type="password"
                    name="confrimPassword"
                    value={formik.values.confrimPassword}
                    onChange={formik.handleChange("confrimPassword")}
                    onBlur={formik.handleBlur("confrimPassword")}
                     />
                     <div className="error">
                     {formik.touched.confrimPassword && formik.errors.confrimPassword}
                   </div> 
                </div>
                <button
                  type="submit"
                  className={Style.button}
                >SignUp</button>
              </div>
            </form>
          </div>
        </div>
      </div>



      <p className={Style.login_box_para}>
        Already have account? <Link href="/login">Log In</Link>
      </p>
    </div>
  );
};

export default signUp;