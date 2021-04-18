import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrder } from "./helper/adminapicall";

const ManageOrder = () => {
  const [Order, setOrder] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getOrder(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
      console.log(data);
    });
  };

  const deleteThisOrder = () => {
    //
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Order here">
      <h2 className="mb-4">All Order:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Order</h2>

          
              <div  className="row text-center mb-2 ">
                <table className="table table-hover  bg-white">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">count</th> */}
                      <th scope="col">Bill Amt</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Order.map((Order, index) => {
            // console.log(index)
            return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{Order.user.name}</td>
                      <td>{Order.products[0].name}</td>
                      <td>{Order.products[0].price}</td>
                      {/* <td>{Order.products[0].count}</td> */}
                      <td>{Order.amount}</td>
                      <td>{Order.status}</td>
                      <td>  <Link
                    className="btn btn-success btn-sm"
                    to={`/admin/category/update/${Order._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                  <button 
                    onClick={() => {
                      deleteThisOrder(Order._id);
                    }}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    Delete
                  </button>
                  </td>
                    </tr>
                    );
          })}
                  </tbody>
                </table>      
              </div>
         
        </div>
      </div>
    </Base>
  );
};

export default ManageOrder;
