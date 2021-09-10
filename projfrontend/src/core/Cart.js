import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PlaceOrder from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)


  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  const loadAllProducts = () => {
    return (
      <div className="border">
        <h3>My cart</h3>
        {products.map((product, index)=> (
          <Card 
          key={index}
          product={product}
          addtoCart={false}
          removeFromCart={true}
          setReload={setReload}
          reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div className="border">
        <h3>Price details</h3>
      </div>
    );
  };

  return (
    <Base tittle="" description="">
      <div className="row text-center">
          <div className="col-8 text-center">{loadAllProducts()}</div>
          <div className="col-4 text-center">
            <PlaceOrder
            products={products}
            setReload={setReload} />
            </div>
      </div>
    </Base>
  );
}

export default Cart;
