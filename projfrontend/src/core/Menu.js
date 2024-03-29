import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout,isAutheticated } from "../auth/helper";

const currentTab = (history,path) => {
  if (history.location.pathname === path){
    return {color:"#2ecc72"}
  }else{
    return {color:"#FFFFFF"}
  }
}

const Menu = ({history}) => (
    

  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history,"/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
          Cart
        </Link>
      </li>
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
        <Link style={currentTab(history,"/user/order")} className="nav-link" to="/user/order">
         Order
        </Link>
      </li>
      )}
        {isAutheticated() && isAutheticated().user.role === 1 && (
          <li className="nav-item">
        <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
          A. Dashboard
        </Link>
      </li>
        )}
      {!isAutheticated() && (
        <Fragment>
      <li className="nav-item">
        <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link style={currentTab(history,"/signIn")} className="nav-link" to="/signIn">
          Sign In
        </Link>
      </li>
      </Fragment>
      )}   
     {isAutheticated() && (
      <li className="nav-item">
        <span className="nav-link text-warning" 
        onClick={() => {
          signout(() =>{
            history.push("/")
          })
        }}
        >
          Signout
        </span>
      </li>
     )}
    </ul>
  </div>
);

export default withRouter(Menu);
