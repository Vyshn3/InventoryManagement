import React, { useState } from "react";
import ProductService from '../services/ProductService';
import NavComponent from './NavComponent';
import '../CSS/DeleteComponent.css';

const LowStockProductComponent = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [error, setError] = useState(null);

  const handleFetchProducts = () => {
    if (!threshold.trim()) {
      setError("Please enter a valid price range");
      return;
    }

    setLoading(true);
    setError(null);

    ProductService.getLowStockProducts(threshold)
      .then((response) => {
        setProducts(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        setError("No products found");
        setLoading(false);
        setProducts([]);
      });
  };

  return (
    <>
      <NavComponent />
      <div className="container my-5">
        <h1 className="text-center mb-4">Low-Stock Products</h1>
        <div className="mb-4 d-flex flex-column align-items-center">
          <input
            type="number"
            className="form-control form-control-sm w-50"
            style={{
              maxWidth: "400px",
              fontSize: "0.85rem",
              padding: "5px 10px",
            }}
            placeholder="Enter stock threshold."
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
          
          <button className="btn btn-secondary mt-3" onClick={handleFetchProducts}> Get Low-Stock Products</button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className="text-center text-danger">{error}</div>}

        {products.length > 0 && (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">
                      {product.description}
                    </p>
                    <p className="card-text">ID: {product.id}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">Category ID: {product.categoryId}</p>
                    <p className="card-text">Created on: {product.createdDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LowStockProductComponent;
