import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
  const [value, setValues] = useState({
    name: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { name } = value;
  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setValues({
          ...value,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);
  const handleChange = (event) => {
    setError("");
    setValues({ ...value, name: event.target.value });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
          console.log({ name });
        } else {
          setValues({
            ...value,
            name: "",
          });
          setError(false);
          setSuccess(true);
        }
      }
    );
  };
  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success alert alert-success text-center ">
          Category updated successfully
        </h4>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-danger alert alert-danger text-center ">
          Failed to update category
        </h4>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <div className="row">
        <div className="col-4 ml-4">
          <img src="../../../category.svg " className="img-fluid" />
        </div>
        <div className="col-8">
          <form>
            <div className="form-group">
              <p className="lead">Enter the category</p>
              <input
                type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summer "
              />
              <button className="btn btn-outline-success" onClick={onsubmit}>
                Update Category
              </button>
            </div>
          </form>
          <div className="mt-5 ">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
              Admin home
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      tittle="Update a Category here!"
      description="Welcome to Category Updation section"
      className="container p-4"
    >
      {successMessage()}
      {errorMessage()}
      {myCategoryForm()}
      <p className="text-dark text-center ">{JSON.stringify(value)}</p>
    </Base>
  );
};

export default UpdateCategory;
