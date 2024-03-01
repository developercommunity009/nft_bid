import React from 'react'


// INTERNAL EXPORT
import Style from "../styles/subscription.module.css";
import Subscription from '../Subscription/Subscription';


const subscription = () => {

  const SubscriptionArray = [
    {
      plan: "STARTER",
      price: "$5/mo",
      popular: "",
      service: ["Automated Reporting", "Faster Processing", "Customizations"],
      info: "Literally you probably haven't heard of jean shorts.",
    },
    {
      plan: "BASIC",
      price: "$15/mo",
      popular: "POPULAR",
      service: ["Everything in Starter", "100 Builds", "Progress Reports", "Premium Suport",],
      info: "Literally you probably haven't heard of jean shorts.",
    },
    {
      plan: "PLUS",
      price: "$25/mo",
      popular: "",
      service: ["Everythng in Basic", "Unlimited Builds", "Advanced Analytics", "Company Evaluations"],
      info: "Literally you probably haven't heard of jean shorts.",
    },
  ]



  return (
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <div className={Style.subscription_box_info}>
          <h1>💎 Subscribtion</h1>
          <p>Pricing to fit the needs of any companie size.</p>
        </div>
        <div className={Style.subscription_box_box}>
        {
          SubscriptionArray.map((el , i)=>(
            <Subscription key={i+1} i={i} el={el}  />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default subscription