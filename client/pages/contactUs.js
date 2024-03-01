import React, { useContext, useEffect, useState } from 'react'
import {
  TiSocialFacebook, TiSocialInstagram, TiSocialYoutube
  , TiSocialLinkedin, TiSocialTwitter
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { useFormik } from "formik";
import * as yup from "yup";

// userEmailCreate
// contactEmailCreate

//INTERNAL IMPORT
import Style from "../styles/contactUs.module.css";
import formStyle from "../Account/From/From.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { contactEmailCreate, userEmailCreate } from '../features/user/userSlice';
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';



const enqSechmema = yup.object({
  name: yup.string().required("name is required!"),
  email: yup.string().email("Should be Valid Email").required("email is required!"),
  discreption: yup.string().required("required is discreption!"),
})


const contactUs = () => {

  const dispatch = useDispatch();

  const { token } = useContext(NFTMarkitplaceContext);

  const { userEmailCreated, contactEmailCreated } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({});




  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      discreption: ""
    },
    validationSchema: enqSechmema,
    onSubmit: (values) => {
      dispatch(contactEmailCreate({ token, values }))
      setUserData(values)
      formik.resetForm();
    }
  })

  useEffect(() => {
    if (contactEmailCreated !== undefined && userData !== undefined) {
      dispatch((userEmailCreate(userData)))
    }
  }, [contactEmailCreated])


  return (
    <div className={Style.contactUs}>
      <div className={Style.contactUs_box}>
        <h1>Contact</h1>
        <div className={Style.contactUs_box_box}>
          <div className={Style.contactUs_box_box_left}>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>Photo booth tattooed prims , portland taiyaki hookie neture typewriter</p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>www.example@example.com</p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>000-231-456-7890</p>
            </div>
            <div className={Style.contactUs_box_box_left_item}>
              <h3>🌏 SOCIALS</h3>
              <a href="#"><TiSocialFacebook /></a>
              <a href="#"><TiSocialInstagram /></a>
              <a href="#"><TiSocialLinkedin /></a>
              <a href="#"><TiSocialYoutube /></a>
            </div>
          </div>


          <div className={Style.contactUs_box_box_right}>
            <form action="" onSubmit={formik.handleSubmit} >
              <div className={formStyle.From_box_input}>
                <label htmlFor="name">Full Name</label>
                <input type="text" placeholder='Enter Name'
                  className={formStyle.From_box_input_userName}
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("emanameil")}

                />
                <div className="error">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
              <div className={formStyle.From_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.From_box_input_box}>
                  <div className={formStyle.From_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="email" placeholder='Email*'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                </div>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className={formStyle.From_box_input}>
                <label htmlFor="description">Message</label>
                <textarea id="" cols="30" rows="6" placeholder='somethink type yourself in few words'
                  name='discreption'
                  value={formik.values.discreption}
                  onChange={formik.handleChange("discreption")}
                  onBlur={formik.handleBlur("discreption")}
                />
                <div className="error">
                  {formik.touched.discreption && formik.errors.discreption}
                </div>
              </div><br />
              <button
                type="submit"
                className={Style.button}
              >Send Message</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default contactUs