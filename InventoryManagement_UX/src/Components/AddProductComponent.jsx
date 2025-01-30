import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import NavComponent from './NavComponent';
import '../CSS/AddComponent.css'; 

const AddProductComponent = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    imageUrls: '',
    isFeatured: false,
    isActive: true,
  });

  const [error, setError] = useState(''); 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageUrls = product.imageUrls.split(',').map((url) => url.trim());

    const newProduct = {
      ...product,
      imageUrls,
      createdDate: new Date().toISOString(),
    };

    ProductService.addProduct(newProduct)
      .then((response) => {
        alert(response.data);
        setProduct({
          name: '',
          description: '',
          price: '',
          quantity: '',
          categoryId: '',
          imageUrls: '',
          isFeatured: false,
          isActive: true,
        });
        setError(''); 
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          setError(errorData); 
        } else {
          setError('There was an error adding the product');
        }
      });
  };


  return (
    <>
        <NavComponent />
        <div className="container mt-5">
        <div className="form-container p-4 border rounded shadow-lg">
            <h2 className="text-center mb-4">Add Product</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label"> Product Name </label>
                <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleInputChange} required />
            </div>

            {/* Product Description */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label"> Product Description </label>
                <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleInputChange} required ></textarea>
            </div>

            {/* Price */}
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price </label>
                <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleInputChange} required />
            </div>

            {/* Quantity */}
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label"> Quantity </label>
                <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange} required />
            </div>

            {/* Category ID */}
            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label"> Category ID </label>
                <input type="number" className="form-control" id="categoryId" name="categoryId" value={product.categoryId} onChange={handleInputChange} required />
            </div>

            {/* Image URLs */}
            <div className="mb-3">
                <label htmlFor="imageUrls" className="form-label"> Image URLs (separate by commas) </label>
                <input type="text" className="form-control" id="imageUrls" name="imageUrls" value={product.imageUrls} onChange={handleInputChange} required />
                <small className="form-text text-muted"> Enter image URLs separated by commas.</small>
            </div>

            {/* Featured */}
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="isFeatured" name="isFeatured" checked={product.isFeatured} onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="isFeatured"> Mark as Featured </label>
            </div>

            {/* Active */}
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="isActive" name="isActive" checked={product.isActive} onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="isActive"> Mark as Active</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-secondary">Add Product</button>
            </form>
        </div>
        </div>
    </>
  );
};

export default AddProductComponent;
