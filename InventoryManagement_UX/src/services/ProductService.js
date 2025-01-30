const PRODUCT_API_BASE_URL = "http://localhost:2024/api/products";
import axios from 'axios';
class ProductService {
  
  // Create a product
  addProduct(product) {
    return axios.post(`${PRODUCT_API_BASE_URL}/add`, product);
  }

  // Get all products
  getAllProducts() {
    return axios.get(`${PRODUCT_API_BASE_URL}`);
  }

  // Get product by ID
  getProductById(id) {
    return axios.get(`${PRODUCT_API_BASE_URL}/getByID/${id}`);
  }

  // Update product by ID
  updateProduct(id, product) {
    return axios.put(`${PRODUCT_API_BASE_URL}/update/${id}`, product);
  }

  // Delete product by ID
  deleteProduct(id) {
    return axios.delete(`${PRODUCT_API_BASE_URL}/delete/${id}`);
  }

  // Search products by name
  searchProduct(productName) {
    return axios.get(`${PRODUCT_API_BASE_URL}/search`, {
      params: {
        productName: productName,
      },
    });
  }

  // Filter products by price range
  filterProductsByPrice(minPrice, maxPrice) {
    return axios.get(`${PRODUCT_API_BASE_URL}/filter`, {
      params: {
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
    });
  }

  // Get products with low stock
  getLowStockProducts(threshold) {
    return axios.get(`${PRODUCT_API_BASE_URL}/low-stock`, {
      params: {
        threshold: threshold,
      },
    });
  }

  // Bulk update product quantities
  updateProductQuantities(productsList) {
    return axios.put(`${PRODUCT_API_BASE_URL}/update-quantities`, productsList);
  }

  // Mark product as featured
  markProductFeatured(id) {
    return axios.put(`${PRODUCT_API_BASE_URL}/${id}/mark-featured`);
  }

  // Get featured products
  getFeaturedProducts() {
    return axios.get(`${PRODUCT_API_BASE_URL}/featured`);
  }

  // Deactivate a product
  deactivateProduct(id) {
    return axios.put(`${PRODUCT_API_BASE_URL}/${id}/deactivate`);
  }

  // Activate a product
  activateProduct(id) {
    return axios.put(`${PRODUCT_API_BASE_URL}/${id}/activate`);
  }

  // Get products by category
  getProductsByCategory(categoryId) {
    return axios.get(`${PRODUCT_API_BASE_URL}/category/${categoryId}`);
  }

  // Get recently added product
  getRecentlyAddedProduct() {
    return axios.get(`${PRODUCT_API_BASE_URL}/recent`);
  }

  // Bulk delete products
  deleteProductsInBulk(productIDList) {
    return axios.delete(`${PRODUCT_API_BASE_URL}/bulk-delete`, {
      params: {
        productIDList: productIDList,
      },
    });
  }

  // Add product image
  addProductImage(id, imageURL) {
    return axios.post(`${PRODUCT_API_BASE_URL}/${id}/images`, {
      imageURL: imageURL,
    });
  }
}

export default new ProductService();
