import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address:"",
    error: "",
    success: false,
  });

  const { name, email, password, address, error, success } = values;

  const handlechange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name,address, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            address: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
      console.log("hello",values)
  };

  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="from-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handlechange("name")}
                type="text"
                value={name}
              />
            </div>
            <div class="form-group">
              <label for="Address">Address</label>
              <textarea
                class="form-control"
                rows="2"
                onChange={handlechange("address")}
                type="text"
                value={address}
              ></textarea>
            </div>
            <div className="from-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handlechange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="from-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handlechange("password")}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Create Succefully.Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup page" description="A page for user signup!">
      {successMessage()}
      {errorMessage()}
      {SignUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
