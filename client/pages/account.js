import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';


//  INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import From from '../Account/From/From';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImge } from '../features/user/userSlice';


const account = () => {


    const dispatch = useDispatch();


    const [paths, setPaths] = useState("");
    const [imgPath, setImgPath] = useState("");

    const { logedInUser } = useSelector((state) => state.auth);

    const onDrop = useCallback(acceptedFiles => {
        const filename = acceptedFiles[0];
        const formData = new FormData();
        formData.append("image", filename);
        setPaths(filename);
        setImgPath(Math.floor(Date.now() / 1000) + filename.name);
        dispatch(uploadImge(formData))

    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });





    return (
        <div className={Style.account}>
            <div className={Style.account_info}>
                <h1>Profile Settings</h1>
                <p>You Can Set Preffered display name, create your Profile other Personal Settings</p>
            </div>
            <div className={Style.account_box}>
                <div className={Style.account_box_img} {...getRootProps()}>
                    <input  {...getInputProps()} />
                    {paths ? <Image
                        src={URL.createObjectURL(paths)}
                        alt='acount upload'
                        width={100}
                        height={100}
                        name="image"
                        className={Style.account_box_img_img}
                    /> :
                        <Image
                            src={logedInUser?.image ? `http://127.0.0.1:3001/static/${logedInUser.image}`: images.profile} 
                            alt='acount upload'
                            width={100}
                            height={100}
                            name="image"
                            className={Style.account_box_img_img}
                        />
                    }
                    <p className={Style.account_box_para}>{paths ? "Change Image" : "Upload Image"}</p>
                </div>
                <div className={Style.account_box_from}>
                    <From  logedInUser ={logedInUser} imgPath={imgPath} />
                </div>
            </div>
        </div>
    )
}

export default account