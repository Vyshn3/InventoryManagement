import React, { useEffect, useState } from "react";
import ProductService from '../services/ProductService';
import NavComponent from './NavComponent'

const ListProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  console.log(products);
  useEffect(() => {
    ProductService.getAllProducts()
      .then((response) => {
        setProducts(response.data); 
        setLoading(false); 
        setError(null);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data || "An error occurred");
        } else {
          setError("There was an error fetching data");
        }
        setLoading(false);
      });
  }, []);

  // Show loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavComponent />
      <div className="container my-5">
        <h1 className="text-center mb-4">Product List</h1>
        <div className="row g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card card-hover d-flex flex-column h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">{product.description}</p>
                    <p className="card-text">ID: {product.id}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">Category ID: {product.categoryId}</p>
                    <p className="card-text">Created on: {new Date(product.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListProductComponent;
