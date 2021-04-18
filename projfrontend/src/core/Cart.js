import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "../admin/helper/adminapicall";
import { loadcart, removeItemFromCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";
import PayPalcheckout from "./Paypalcheckout";
import ImageHelper from "./helper/ImageHelper";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const { user, token } = isAutheticated();

  console.log(user.address);

  useEffect(() => {
    setProducts(loadcart());
  }, [reload]);

  const loadAllProduct = (products) => {
    return (
      <div className="row">
        <div className="offset-1 col-4">
          <h2>Shoping Cart</h2>
          {products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))}
        </div>
        <div className="col-3">
          <h2>Shipping Address</h2>
          <div className="input-group mt-3">
            <div className="input-group-text">
              <input
                className="form-check-input mt-0"
                type="radio"
                aria-label="Radio button for following text input"
                style={{ width: "40px" }}
              />
            </div>
            <textarea
              class="form-control"
              rows="2"
              type="text"
              value={user.address}
              readOnly
            ></textarea>
          </div>
        </div>
        <div className="col-4 ">
        <h2>Payment Option</h2>
        <div className="row">
        <div className="col-12">
        <StripeCheckout products={products} setReload={setReload} />
        </div>
        </div>
        <div className="row mt-2">
        <div className="col-12">
        <p>
            <a
              class="btn btn-primary"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >
              Credit / Debit / ATM Card
            </a>
            
          </p>
          <div class="row">
            <div class="col">
              <div class="collapse multi-collapse" id="multiCollapseExample1">
                <div class="card card-body">
                <PayPalcheckout products={products} setReload={setReload} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
       
     
        </div>
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="My Cart" description="Ready to checkout">
      <div className="">
        {products.length > 0 ? (
          loadAllProduct(products)
        ) : (
          <div className="row">
            <div className="offset-3  col-6">
              <h3 className="text-center">Your Cart is Empty!</h3>
              <h6 className="text-center">Add item so it now.</h6>

              <div className="text-center">
                <Link className="btn btn-primary" to={`/`}>
                  <span className="">Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
};
export default Cart;
