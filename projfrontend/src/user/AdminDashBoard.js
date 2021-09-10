import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const {user: {name, email, role}} = isAuthenticated();

  const adminLeftSide = () => {
      return(
        <div className=" card text-white admin" >
           <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
           <ul className="list-group ">
              <li className="list-group-item border-white">
                  <Link to="/admin/create/category" className="btn btn-outline-success">
                      Create categories</Link>
              </li>

              <li className="list-group-item border-white">
                  <Link to="/admin/categories" className="btn btn-outline-success">
                      Manage categories</Link>
              </li>

              <li className="list-group-item border-white">
                  <Link to="/admin/create/product" className="btn btn-outline-success">
                      Create Product   </Link>
              </li>

              <li className="list-group-item border-white">
                  <Link to="/admin/products" className="btn btn-outline-success">
                      Manage Products  </Link>
              </li>

              <li className="list-group-item border-white">
                  <Link to="/admin/orders" className="btn btn-outline-success">
                      Manage Orders    </Link>
              </li>
           </ul>
        </div>
      )
  };

  const adminRightSide = () => {
      return(
          <div className=" card text-white">
              <h4 className="card-header bg-dark text-white">Hi {name}, <br/> Welcome to admin dashboard</h4>
              <ul className="list-group ">
                  <li className="list-group-item border-white" >
                    <span className="badge bg-success mr-2 ">
                     Name:
                    </span>  {name}
                  </li>

                  <li className="list-group-item border-white " >
                    <span className="badge bg-success mr-2 ">
                     Email:
                    </span>  {email}
                  </li>

                  <li className="list-group-item border-white" >
                    <span className="badge bg-danger mr-2 ">
                     Admin area
                    </span>
                  </li>
              </ul>
          </div>
      )
  };

    return (
        <Base tittle="Welcome to admin area" 
         description="Manage all your products here"
         className="container card shadow p-3 mb-5 bg-white rounded   text-white p-4">
       <div className="row">
         <div className="col-3">{adminLeftSide()}</div>
         <div className="col-9">{adminRightSide()}</div>
       </div>
        </Base>
    )
}

export default AdminDashboard;
