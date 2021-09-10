import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTittle = product ? product.name : "A Photo from pixels";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showaddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block form-control btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showremoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          className="btn btn-block form-control btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card ">
      <div className="card-header lead">{cardTittle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success text-white font-weight-normal rounded text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showaddToCart(addtoCart)}</div>
          <div className="col-12">{showremoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
