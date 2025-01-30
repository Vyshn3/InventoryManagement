import React, { useEffect, useState } from "react";
import ProductService from '../services/ProductService';
import NavComponent from './NavComponent'
import '../CSS/DeleteComponent.css'

const GetProductByIDComponent = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [productId,setProductId] = useState("");
  const [error,setError] = useState(null);

  const handleFetchProduct = () =>{
    if(!productId){
      setError("Please enter a valid product ID");
      return;
    }
    setLoading(true);
    setError(null);

    ProductService.getProductById(productId)
    .then((response) => {
      setProduct(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      setError("Product not Found");
      setLoading(false);
      setProduct(null);
    });
  };


  return (
    <>
      <NavComponent />
      <div className="container my-5">
        <h1 className="text-center mb-4">Product By ID</h1>
        <div className ="mb-4 d-flex flex-column align-items-center">
          <input type="text" className="form-control form-control-sm w-50"
            style={{
              maxWidth: "400px", 
              fontSize: "0.85rem", 
              padding: "5px 10px", 
            }} 
            placeholder="Enter Product ID" 
            value={productId} 
            onChange={(e)=> setProductId(e.target.value)} 
          />
          <button className="btn btn-secondary mt-3" onClick={handleFetchProduct}>Fetch Product</button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className=" text-center text-danger">{error}</div>}
        {product && (
           <div className="d-flex justify-content-center">
           <div className="card" style={{ width: "35rem" }}>
             <div className="card-body">
               <h5 className="card-title">{product.name}</h5>
               <p className="card-subtitle mb-2 text-muted">{product.description}</p>
               <p className="card-text">ID: {product.id}</p>
               <p className="card-text">Price: ${product.price}</p>
               <p className="card-text">Quantity: {product.quantity}</p>
               <p className="card-text">Category ID: {product.categoryId}</p>
              <p className="card-text">Created on: {product.createdDate}</p>
              </div>
            </div>
          </div>
        )} 
      </div>
    </>
  );
};

export default GetProductByIDComponent;
