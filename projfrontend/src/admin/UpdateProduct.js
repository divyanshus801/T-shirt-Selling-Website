import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {  getCategories, getProduct, updateProduct } from "./helper/adminapicall";


const UpdateProduct = ({match}) => {

  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    updatedProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then(data => {
        
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            preloadCategories();
            setValues({
                ...values, 
               name: data.name,
               description: data.description,
               price: data.price,
               //category: data.category._id,
               stock: data.stock,
               formData: new FormData()
               
            });
            
        }
    });
  };

  const preloadCategories = () => {
      getCategories().then(data => {
          if(data.error){
            setValues({...values, error: data.error})
          } else {
              setValues({
                  categories: data,
                  formData: new FormData()
              })
          }
      })
  }

 useEffect(() => {
     preload(match.params.productId);
 }, []);

  const handleChange = (name) => (event) => {
    const value = name ==="photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({...values, [name]: value });
};

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "",loading: true})

    updateProduct(match.params.productId, user._id, token, formData)
    .then(data => {
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                updatedProduct: data.name

            });
            
        }
    })
    
  };

  const successMessage = () => (
     <div className="alert alert-success mt-3 text-center"
     style={{display: updatedProduct ? "" : "none"}}>
       <h4>{updatedProduct} updated successfully</h4>
     </div>
  );

  const errorMessage = () => (
    <div className="alert alert-danger mt-3 text-center"
    style={{display: error ? "" : "none"}}>
      <h4>{error},Pleae try again! </h4>
    </div>
 );

  const updateProductForm = () => (
    <div className="row">
      <div className="col-4">
        <img src="../../../category.svg  " className="img-fluid" />
      </div>
      <div className="col-8">
        <form>
          <span>Post photo</span>
          <div className="form-group mb-2">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
              required
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              required
            />
          </div>
          <div className="form-group mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
              required
            >
              
              {categories && 
              categories.map((cate, index) => (
                <option key={cate.index} value={cate._id}>{cate.name} </option>
              ))}
              
            </select>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
              required
              
            />
          </div>

          <button
            type="submit"
            onClick={onSubmit}
            className="mx-2 btn btn-outline-success"
            required
          >
            Update Product
          </button>

          <Link to="/admin/dashboard" className="btn  btn-success mx-2">
            Admin Home
          </Link>
        </form>
      </div>
    </div>
  );

  return (
    <Base
      tittle="Update a product here!"
      description="Welcome to product Updation section"
      className="container p-4"
    >
        {errorMessage()}
       {successMessage()}
      {updateProductForm()}
      
    </Base>
  );
};

export default UpdateProduct;
