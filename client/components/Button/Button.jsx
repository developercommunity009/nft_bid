import React from 'react'


// INTERNAL IMPORT
import Style from "./Button.module.css"
const Button = ({ type , btnName , handleClick , classStyle , icon }) => {
  return (
    <div className={Style.box}>
      <button type={type} className={`${Style.button} ${classStyle}`} onClick={() => handleClick()}>
      {icon}  {btnName}
      </button>
    </div>
  )
}

export default Button