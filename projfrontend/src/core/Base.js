import React from "react";
import Menu from "./Menu";


const Base = ({
    tittle="My Tittle",
    description="My description",
    className=" bg-white text-dark  ",
    children
}) => (
  <div>
    <Menu/>
    <div className="container border shadow-sm bg-body roundeds mb-4 pb-3">
      <div className="jumbotron bg-white text-dark text-center">
        <h1 className="display-8">{tittle}</h1>
        <p className="lead"> {description}</p>
      </div>
      <div className={className}>{children}</div>
      
    </div>
    <footer className="footer bg-success mt-4 pt-3 ">
      <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, Fell free to reach out!</h4>
          <button className="btn btn-warning btn-lg ">Contact us</button>
      </div>
      <div className="container ">
          <span className="text-white ">
             An amazing <span className="text-dark">MERN</span> bootcamp
          </span>
      </div>
    </footer>
  </div>
);

export default Base;
