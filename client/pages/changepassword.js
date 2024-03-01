
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";

//INTERNAL IMPORT
import Styles from "../styles/login.module.css";
import Style from "../loginAndSignUp/loginAndSignUp.module.css";
import { Button } from "../components/componentIndex";
import { useDispatch, useSelector } from 'react-redux';
import { updatePssword } from '../features/user/userSlice';
import { NFTMarkitplaceContext } from '../Context/NFTMarketplaceContext';

const changepassword = () => {


    const dispatch = useDispatch();
    const router = useRouter();
    const { updatedPass } = useSelector((state) => state.auth)
    const { token } = useContext(NFTMarkitplaceContext);
    const [data, setData] = useState({
        currentPassword:"",
        password: "",
        confrimPassword: ""
    });

    


    const handleSubmit = () => {
        dispatch(updatePssword({ token, data }));
    }
    useEffect(() => {
        if(updatedPass !== undefined)
            router.push("/");
    }, [updatedPass])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <div className={Styles.login}>
            <div className={Styles.login_box}>
                <h2> Update Your Password </h2>
                <p>password and new psasword Should be write 8 cherecter otherwise get Error  </p>



                <div className={Style.user}>
                    <div className={Style.user_box}>


                        <div className={Style.user_box_input}>


                            <div className={Style.user_box_input_box}>
                                <label
                                    htmlFor="password"
                                    className={Style.user_box_input_box_label}
                                >
                                    <p>Current password</p>

                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="enter current password"
                                    value={data.currentPassword}
                                    onChange={handleChange} />
                            </div>
                            <div className={Style.user_box_input_box}>
                                <label
                                    htmlFor="password"
                                    className={Style.user_box_input_box_label}
                                >
                                    <p> new password</p>

                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="enter password"
                                    value={data.password}
                                    onChange={handleChange} />
                            </div>


                            <div className={Style.user_box_input_box}>
                                <label
                                    htmlFor="confrimPassword"
                                    className={Style.user_box_input_box_label}
                                >
                                    <p>Confrom new password</p>
                                </label>
                                <input
                                    type="password"
                                    name="confrimPassword"
                                    placeholder="confrim new password"
                                    value={data.confrimPassword}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <Button btnName={"reset password"} classStyle={Style.button} handleClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default changepassword