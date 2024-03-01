import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentIndex";
import { setError, openError } from "../Context/NFTMarketplaceContext";
import { loginUser, registerUser } from "../features/user/userSlice";


const loginAndSignUp = () => {

  const dispatch = useDispatch();

  const [activeBtn, setActiveBtn] = useState(1);
  const [isSignUp, setSignUp] = useState(true);
  const [forgetPass, setForgetPass] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    if (path === "/singUp") {
      setSignUp(true)
    } else if (path === "/login") {
      setSignUp(false);
    } else if (path === "/forgetPassword") {
      setForgetPass(true);
      setSignUp(false);
    }
  }, [])


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: ""
  });


  const logIn = () => {
    console.log("Enter")
    axios.post("http://localhost:3001/api/v1/auth/login", data)
      .then((e) => { localStorage.setItem("data", JSON.stringify(e.data)); router.push("/") })
      .catch((e) => console.log(e));
  }


  const forgetPassword = () => {
    axios.post("http://localhost:3001/api/v1/auth/forgetpassword", data)
      .then((e) => console.log(e))
      // .then((e) => router.push("/resetPassword"))
      .catch((e) => console.log(e));
  }


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (isSignUp) {
      dispatch(registerUser(data));
    }else if(forgetPass) {
      forgetPassword();
    }else{
      loginUser();
    }
  }

  const socialImage = [
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
    {
      social: images.twitter,
      name: "Continue with twitter",
    },
    {
      social: images.facebook,
      name: "Continue with Facebook",
    },
  ];
  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        {!forgetPass && <div className={Style.user_box_social}>
          {socialImage.map((el, i) => (
            <div
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
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
        </div>}
        {!forgetPass && <p className={Style.user_box_or}>OR</p>}

        <div className={Style.user_box_input}>
          {isSignUp && <div className={Style.user_box_input_box}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Enter youe name"
              onChange={handleChange} />
          </div>}
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              placeholder="example@emample.com"
              onChange={handleChange} />
          </div>

          {!forgetPass && <div className={Style.user_box_input_box}>
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
              value={data.password}
              onChange={handleChange} />
          </div>}

          {isSignUp && <div className={Style.user_box_input_box}>
            <label
              htmlFor="confrimPassword"
              className={Style.user_box_input_box_label}
            >
              <p>Confrim Password</p>

            </label>
            <input
              type="password"
              name="confrimPassword"
              value={data.confrimPassword}
              onChange={handleChange} />
          </div>}
        </div>

        <Button btnName={isSignUp ? "singUp" : "send request"} classStyle={Style.button} handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default loginAndSignUp;