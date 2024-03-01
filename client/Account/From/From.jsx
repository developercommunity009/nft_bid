import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";


// INTERNAL IMPORT
import Style from "./From.module.css";
import { Button } from '../../components/componentIndex';
import { useRouter } from 'next/router';
import { registerUser, updateUser } from '../../features/user/userSlice';
import { NFTMarkitplaceContext } from '../../Context/NFTMarketplaceContext';
// import Stylee from "../../components/Button/Button.module.css";



const Form = (props) => {
  const { imgPath, logedInUser } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  const { token } = useContext(NFTMarkitplaceContext);


  const [isCopied, setIsCopied] = useState(false);
  const [edit, setEdit] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [wallet, setWallet] = useState();


  const formData = {
    name,
    image: imgPath,
    email,
    website,
    facebook,
    twitter,
    instagram,
    discreption,
    wallet
  };



  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ values: formData, token }))
    setEdit(true);
  }


  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
    copyText.select()
    navigator.clipboard.writeText(copyText.value);
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 500)
  }
  useEffect(() => {

  })


  return (
    <div className={Style.From}>
      <div className={Style.From_box_one}>
        <p>Edit Profile</p>
          <FaEdit onClick={()=> setEdit(false) }/>
        
      </div>
      <div className={Style.From_box}>

        <form action="" onSubmit={handleSubmit} >
          <div className={Style.From_box_input}>
            <label htmlFor="name">Name</label>
            <div className={Style.From_box_input_box}>
              <div className={Style.From_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                disabled={edit}
                type="text"
                placeholder='enter name'
                name="name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={ formData.name || logedInUser?.name }
              />
            </div>
          </div>
          <div className={Style.From_box_input}>
            <label htmlFor="emaile">Email</label>
            <div className={Style.From_box_input_box}>
              <div className={Style.From_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                disabled={edit}
                type="text"
                placeholder='Email*'
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={ formData.email || logedInUser?.email}
              />
            </div>
          </div>
          <div className={Style.From_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              disabled={edit}
              name="discreption"
              cols="30" rows="6"
              placeholder='somethink type yourself in few words'
              onChange={(e) => setDiscreption(e.target.value)}
              defaultValue={formData.discreption || logedInUser?.discreption }
            ></textarea>
          </div>
          <div className={Style.From_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.From_box_input_box}>
              <div className={Style.From_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                disabled={edit}
                type="text"
                placeholder='website'
                name="website"
                onChange={(e) => setWebsite(e.target.value)}
                defaultValue={formData.website || logedInUser?.website }
              />
            </div>
          </div>

          <div className={Style.From_box_input_social}>
            <div className={Style.From_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.From_box_input_box}>
                <div className={Style.From_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  disabled={edit}
                  type="text"
                  placeholder='http://codeVertix.com'
                  name="facebook"
                  onChange={(e) => setfacebook(e.target.value)}
                  defaultValue={ formData.facebook || logedInUser?.facebook}
                />
              </div>
            </div>


            <div className={Style.From_box_input}>
              <label htmlFor="twitter">Twitter</label>
              <div className={Style.From_box_input_box}>
                <div className={Style.From_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  disabled={edit}
                  type="text"
                  placeholder='http://codeVertix.com'
                  name="twitter"
                  onChange={(e) => setTwitter(e.target.value)}
                  defaultValue={formData.twitter || logedInUser?.twitter }
                />
              </div>
            </div>


            <div className={Style.From_box_input}>
              <label >Instagram</label>
              <div className={Style.From_box_input_box}>
                <div className={Style.From_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  disabled={edit}
                  type="text"
                  placeholder='http://codeVertix.com'
                  name="instagram"
                  onChange={(e) => setInstagram(e.target.value)}
                  defaultValue={formData.instagram || logedInUser?.instagram }
                />
              </div>
            </div>
          </div>
          <div className={Style.From_box_input}>
            <label htmlFor="wallet">Wallet address</label>
            <div className={Style.From_box_input_box}>
              <div className={Style.From_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                disabled={edit}
                id='myInput'
                type="text"
                placeholder='0x00007970C51812dc3A010C0d01b50eed17dd79C8'
                name="wallet"
                onChange={(e) => setWallet(e.target.value)}
                defaultValue={ formData.wallet || logedInUser?.wallet}
              />
              <div className={Style.From_box_input_box_icon} onClick={copyAddress}>
                <MdOutlineContentCopy />
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </div>
            </div>
          </div>
          <div className={Style.From_box_btn}>
            <button
              type="submit"
              className={Style.button}
            >Upload profile</button>
          </div>

        </form>
      </div>
    </div >
  )
}

export default Form