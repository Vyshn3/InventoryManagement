import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import '../CSS/DeleteComponent.css';

const DeleteProductComponent = () => {
  const [productId, setProductId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setProductId(e.target.value);

    if (e.target.value) {
      setError(null); 
    }
    setSuccessMessage(''); 
  };

  
  const handleDeleteProduct = () => {
    if (productId) {
      ProductService.deleteProduct(productId)
        .then((response) => {
          setSuccessMessage(response.data);
          setProductId('');
          setError(null); 
        })
        .catch((err) => {
          setError(err.response.data);
          setSuccessMessage(''); 
        });
    } else {
      setError('Please provide a valid Product ID.');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="form-container border rounded shadow-lg">
      <div className="card p-4">
        <h3>Delete Product</h3>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="number"
            id="productId"
            className="form-control"
            value={productId}
            onChange={handleInputChange}
            placeholder="Enter Product ID to delete"
          />
        </div>

        <button className="btn btn-danger" onClick={handleDeleteProduct}>
          Delete Product
        </button>

        {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
        {error && <div className="mt-3 text-danger">{error}</div>}
      </div>
    </div>
  );
};

export default DeleteProductComponent;
