import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeButton from "react-stripe-checkout";



const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = () => {
      
  }

  const showStripeButton = () => {
      return isAuthenticated() ? (
        <StripeButton
        stripeKey=""
        token={makePayment}
        amount={getFinalPrice() *  100}
        name="Checkout Here"
        shippingAddress
        billingAddress
        > 
        
        <button className="btn-lg btn-success mb-3" >Pay now {getFinalPrice()}</button>
        </StripeButton>
      ) 
      : (
          <Link to="/signin">
              <button className="btn-lg btn-success mb-3">Signin to place order</button>
          </Link>
      )
  }

  return (
    <div className="border">
      <h3>Price details</h3>
      <hr />
      <br />
      <div className="row">
        <br />
        <div className="col-6">
          <h5>Delivery Charges</h5>
          
          <br />
          <h5>Total Payable amount: </h5><br/>
        </div>
        <div className="col-6">
          <span className="btn-sm btn-success">Free</span>
          <br/>
          <br/>
          <br />
          <h5> {getFinalPrice()}</h5><br/>
        </div>
        
      </div>
      <div className="text-center mb-3">{showStripeButton()}</div>
    </div>
  );
};

export default StripeCheckout;
