import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, signout} from "../auth/helper";



const currentTab = (history, path) => {

    if(history.location.pathname === path){
        return { color: "#2ecc72"
      }
    }else{
        return {color : "grey"}
    }
}

const Menu = ({ history }) => (
  <div className="" >
    <ul className=" shadow-sm p-3 mb-5 bg-body rounded nav nav-tabs bg-white py-3 px-3">
      <li className="nav-item">
        <Link style={currentTab(history, "/") }
         className="nav-link " to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link style={currentTab(history, "/cart")}
         className="nav-link" to="/Cart">
          Cart
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
        <Link style={currentTab(history, "/user/dashboard")}
         className="nav-link " to="/user/dashboard">
         U. Dashboard
        </Link>
      </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
        <Link style={currentTab(history, "/admin/dashboard")}
         className="nav-link" 
         to="/admin/dashboard">
          A. Dashboard
        </Link>
      </li>
      )}

       {!isAuthenticated() && (
       <Fragment>
      <li className="nav-item">
        <Link style={currentTab(history, "/signup")}
         className="nav-link" to="/signup">
          Signup
        </Link>
      </li>

      <li className="nav-item">
        <Link style={currentTab(history, "/signin")}
         className="nav-link " to="/signin" >
          Signin
        </Link>
      </li>
      </Fragment>
      )}

      <li className="nav-item">
        {isAuthenticated() && (
          <Link onClick={()=> {
            signout(() => {
              history.push("/")
            });
          }} 
          className="nav-link link-warning">
          signout
          </Link>
        )}
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
