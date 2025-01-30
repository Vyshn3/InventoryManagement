import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import NavComponent from './NavComponent';
import '../CSS/AddComponent.css'; 

const UpdateProductComponent = () => {
  const [product, setProduct] = useState({
    id:'',
    name: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    imageUrls: '',
    isFeatured: false,
    isActive: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process image URLs (split by commas and trim spaces)
    const imageUrls = product.imageUrls.split(',').map((url) => url.trim());

    // Prepare the product object to send
    const newProduct = {
      ...product,
      imageUrls,
      createdDate: new Date().toISOString(),
    };

    // Send POST request using ProductService
    ProductService.updateProduct(newProduct.id,newProduct)
      .then((response) => {
        alert(response.data);
        setProduct({
          id:'',
          name: '',
          description: '',
          price: '',
          quantity: '',
          categoryId: '',
          imageUrls: '',
          isFeatured: false,
          isActive: true,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data}`);
        } else {
          console.error('There was an error updating the product!', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      });
  };


  return (
    <>
        <NavComponent />
        <div className="container mt-5">
        <div className="form-container p-4 border rounded shadow-lg">
            <h2 className="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
            {/* Product ID */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label"> Product ID </label>
                <input type="number" className="form-control" id="id" name="id" value={product.id} onChange={handleInputChange} required />
            </div>

            {/* Product Name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label"> Product Name </label>
                <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleInputChange}  />
            </div>

            {/* Product Description */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label"> Product Description </label>
                <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleInputChange}  ></textarea>
            </div>

            {/* Price */}
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price </label>
                <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleInputChange}  />
            </div>

            {/* Quantity */}
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label"> Quantity </label>
                <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange}  />
            </div>

            {/* Category ID */}
            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label"> Category ID </label>
                <input type="number" className="form-control" id="categoryId" name="categoryId" value={product.categoryId} onChange={handleInputChange}  />
            </div>

            {/* Image URLs */}
            <div className="mb-3">
                <label htmlFor="imageUrls" className="form-label"> Image URLs (separate by commas) </label>
                <input type="text" className="form-control" id="imageUrls" name="imageUrls" value={product.imageUrls} onChange={handleInputChange}  />
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
            <button type="submit" className="btn btn-secondary">Update Product</button>
            </form>
        </div>
        </div>
    </>
  );
};

export default UpdateProductComponent;
