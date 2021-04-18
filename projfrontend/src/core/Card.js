import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  console.log(product);
  const cartTitle = product ? product.name : "A photo from pexel";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const ShowAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const ShowRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info mt-2" style={{width:'30rem'}}>
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead font-weight-normal text-center  text-info text-wrap">
          {cartDescription}
        </p>
        {product.count > 0 ? (
          <p>
            Quantity{" "}
            <input
              className="form-control form-control-sm"
              type="text"
              value={count}
              style={{ width: "50px" }}
            />
          </p>
        ) : (
          ""
        )}
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{ShowAddToCart(addtoCart)}</div>
          <div className="col-12">{ShowRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
