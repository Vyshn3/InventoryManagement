package com.example.Service;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Dao.ProductRepository;
import com.example.Model.Product;
import com.example.Model.ProductQuantityUpdate;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.Min;

@Service
public class ProductService {
	
	@Autowired
	ProductRepository repo;

	public String addProduct(Product product) {
		repo.save(product);
		return "Product added successfully";	
	}

	public List<Product> getAllProducts() {
		return repo.findAll();
	}

	public Product getProductById(long id) {
		return repo.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found with ID: " + id));
	}

	public void updateProduct(long id,Product product) {
		Product existingProduct = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found with ID: " + id));
	    existingProduct.setName(product.getName());
	    existingProduct.setDescription(product.getDescription());
	    existingProduct.setPrice(product.getPrice());
	    existingProduct.setQuantity(product.getQuantity());
	    existingProduct.setIsFeatured(product.getIsFeatured());
	    existingProduct.setIsActive(product.getIsActive());
	    existingProduct.setCategoryId(product.getCategoryId());
	    existingProduct.setImageUrls(product.getImageUrls());
	    existingProduct.setCreatedDate(product.getCreatedDate());
	    repo.save(existingProduct);
	}

	public void deleteProduct(long id) {
		Product product = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found with ID: " + id));
		repo.deleteById(id);
	}

	public List<Product> searchProduct(String productName) {
		List<Product> products = repo.findByName(productName);
		if (products.isEmpty()) {
		   throw new NoSuchElementException("Product not found with Name: " + productName);
		}
		return products;
	}

	public List<Product> FilterProductByPrice(double minPrice, double maxPrice) {
		List<Product> products = repo.findByPriceBetween(minPrice, maxPrice);
		if (products.isEmpty()) {
			 throw new NoSuchElementException("No products found within the specified price range");
		}
		return products;
	}

	public List<Product> productsWithLowStock(int threshold) {
		List<Product> products = repo.findAll().stream().filter(product -> product.getQuantity()<threshold).collect(Collectors.toList());
		if (products.isEmpty()) {
			throw new NoSuchElementException("No products found with stock less than "+threshold);
		}
		return products;
		
	}

	public String updateProductQuantities(List<ProductQuantityUpdate> products_list) {
		
		for(ProductQuantityUpdate product:products_list) {
			Product totalProduct = repo.findById(product.getId()).orElseThrow(()->new EntityNotFoundException("Product ID"+product.getId()+"does not exist"));
			totalProduct.setQuantity(product.getQuantity());
			repo.save(totalProduct);
		}
		return "Updated Quantities";
	}

	public void markProductFeatured(long id) {
		Product product = repo.findById(id).orElseThrow(()->new NoSuchElementException("Product ID "+id+" not found"));
		product.setIsFeatured(true);
		repo.save(product);
		
	}

	public void deactivateProduct(long id) {
		Product product = repo.findById(id).orElseThrow(()->new NoSuchElementException("Product ID "+id+" not found"));
		product.setIsActive(false);
		repo.save(product);
	}

	public void activateProduct(long id) {
		Product product = repo.findById(id).orElseThrow(()->new NoSuchElementException("Product ID "+id+" not found"));
		product.setIsActive(true);
		repo.save(product);
	}

	public List<Product> getProductByCategory(long categoryId) {
		List<Product> products = repo.findByCategoryId(categoryId);
		if (products.isEmpty()) {
			throw new NoSuchElementException("No products found with CategoryID "+categoryId);
		}
		return products;
		
	}

	public Product getRecentlyAddedProduct() {
		return repo.findByCreatedDate();
	}

	public String deleteProductsInBulk(List<Integer> productIDList) {
		
		for(long id:productIDList) {
			Product product = repo.findById(id).orElseThrow(()->new NoSuchElementException("Product ID "+id+" not found"));
			repo.delete(product);
		}
		
		return "Deleted Products given";
	}

	public String addProductImage(long id, String imageURL) {
		Product product = repo.findById(id).orElseThrow(()->new EntityNotFoundException("Product ID "+id+" not found"));
		product.getImageUrls().add(imageURL);
		repo.save(product);
		return "Updated the ImageURL";
	}

	public List<Product> featuredProducts() {
		List<Product> products = repo.findAll().stream().filter(product -> product.getIsFeatured()==true).toList();
		if (products.isEmpty()) {
			throw new NoSuchElementException("No Featured products exist");
		}
		return products;
		
	}

	

	

}
