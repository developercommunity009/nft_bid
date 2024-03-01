import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";

//INTERNAL IMPORT
import Styles from "../../styles/login.module.css";
import Style from "../../loginAndSignUp/loginAndSignUp.module.css";
import { Button } from "../../components/componentIndex";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/user/userSlice';



const resetpassword = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { token } = router.query;

    const { response } = useSelector((state) => state.auth)

    const [data, setData] = useState({
        password: "",
        confrimPassword: ""
    });

    const [request, setRequest] = useState(false);


    const handleSubmit = () => {
        dispatch(resetPassword({ token, data }));
        setRequest(true)
    }
    useEffect(() => {
        if (request) {
            router.push("/login");
        }
    }, [response])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <div className={Styles.login}>
            <div className={Styles.login_box}>
                <h2> Reset Your Password </h2>
                <p>password and confrimPsasword Should be write 8 cherecter otherwise get Error  </p>



                <div className={Style.user}>
                    <div className={Style.user_box}>


                        <div className={Style.user_box_input}>


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
                                    placeholder="enter password"
                                    value={data.password}
                                    onChange={handleChange} />
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
                                    placeholder="enter confrim password"
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

export default resetpassword