package com.example.Controller;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;


import com.example.Model.Product;
import com.example.Model.ProductQuantityUpdate;
import com.example.Service.ProductService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
@Validated
public class ProductController {
	
	@Autowired
	ProductService service;
	
	//create a product
	@PostMapping("/products/add")
	public ResponseEntity<Object> addProduct(@RequestBody @Valid Product product) {
		service.addProduct(product);
		return ResponseEntity.status(HttpStatus.CREATED).body("Product created successfully");
	}
	
	
	//Get All products
	@GetMapping("/products")
	public ResponseEntity<Object> getAllProducts(){
		List<Product> products= service.getAllProducts();
		if(products.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found");
		}
		 return ResponseEntity.ok(products);
	}
	
	//Get Product By ID
	@GetMapping("/products/getByID/{id}")
	public ResponseEntity<Object> getProductById(@PathVariable("id") @Positive(message = "ID must be a positive number") long id) {
		Product product = service.getProductById(id);
	    return ResponseEntity.ok(product);   
	}
	
	//update product by ID
	@PutMapping("/products/update/{id}")
	public ResponseEntity<Object> updateProduct(@PathVariable("id") @Positive(message = "ID must be a positive number") long id,@RequestBody @Valid Product product) {
		 service.updateProduct(id, product);
		 return ResponseEntity.ok("Product updated successfully");	
	}
	
	//delete product
	@DeleteMapping("/products/delete/{id}")
	public ResponseEntity<Object> deleteProduct(@PathVariable("id") @Positive(message = "ID must be a positive number") long id) {
		service.deleteProduct(id);
	    return ResponseEntity.ok("Product with ID "+ id + " deleted successfully");
	   
	}
	
	//Search Product by name
	@GetMapping("/products/search")
	public ResponseEntity<Object> searchProduct(@RequestParam @NotBlank @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters") String productName) {
		List<Product> products = service.searchProduct(productName);
		return ResponseEntity.ok(products); 
	}
	
	
	//Filter Product By Price Range
	@GetMapping("/products/filter")
	public ResponseEntity<Object> FilterProductByPrice(@RequestParam double minPrice, @RequestParam double maxPrice) {
		
		if (minPrice < 0 || maxPrice < 0) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Price values cannot be negative");
	    }
	    if (minPrice > maxPrice) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("minPrice can't be higher than maxPrice");
	    }
	    List<Product> products = service.FilterProductByPrice(minPrice, maxPrice);
	    return ResponseEntity.ok(products);
	}
	
	//get Product with Low Stock
	@GetMapping("/products/low-stock")
	public ResponseEntity<Object> productsWithLowStock(@RequestParam @Positive(message = "Threshold cannot be a Negative number") int threshold){
		List<Product> products = service.productsWithLowStock(threshold);
		return ResponseEntity.ok(products);
	}
	
	//Bulk Update Product Quantities
	@PutMapping("/products/bulk-update-quantities")
	public String updateProductQuantities(@RequestBody List<ProductQuantityUpdate> products_list) {
		return service.updateProductQuantities(products_list);
	}
	
	//Get Top-Selling Products
	
	//Mark a Product a Featured
	@PutMapping("products/{id}/mark-featured")
	public ResponseEntity<Object> markProductFeatured(@PathVariable("id") @Positive(message = "ID must be a positive number") long id) {
		return ResponseEntity.ok("Product ID "+id+" marked successfully");
	}
	
	//Get Featured Products
	@GetMapping("products/featured")
	public ResponseEntity<Object> featuredProducts(){
		List<Product> products = service.featuredProducts();
		return ResponseEntity.ok(products);
	}
	
	//Deactivate a Product
	@PutMapping("products/{id}/deactivate")
	public ResponseEntity<Object> deactivateProduct(@PathVariable("id") @Positive(message = "ID must be a positive number") long id) {
		return ResponseEntity.ok("Product ID "+id+" deactivated successfully");
	}
	
	//Activate a Product
	@PutMapping("products/{id}/activate")
	public ResponseEntity<Object> activateProduct(@PathVariable("id") @Positive(message = "ID must be a positive number") long id) {
		return ResponseEntity.ok("Product ID "+id+" activated successfully");
	}
	
	//Get Product By Category
	@GetMapping("/products/category/{categoryId}")
	public ResponseEntity<Object> getProductByCategory(@PathVariable("categoryId") @Positive(message = "CategoryID must be a positive number") long categoryId){
		List<Product> products =  service.getProductByCategory(categoryId);
		return ResponseEntity.ok(products);
	}
	
	//Get Recently Added Product
	@GetMapping("/products/recent")
	public ResponseEntity<Object> getRecentlyAddedProduct() {
		Product product = service.getRecentlyAddedProduct();
		return ResponseEntity.ok(product);
	}
	
	
	//Bulk Delete Products
	@DeleteMapping("/products/bulk-delete")
	public ResponseEntity<Object> deleteProductsInBulk(@RequestParam List<Integer> productIDList) {
		service.deleteProductsInBulk(productIDList);
		return ResponseEntity.ok("products deleted successfully");
	}
	
	//add Product Image
	@PostMapping("products/{id}/images")
	public ResponseEntity<Object> addProductImage(@PathVariable("id") @Positive(message = "ID must be a positive number") long id,@RequestParam String imageURL) {
		service.addProductImage(id,imageURL);
		return ResponseEntity.ok("Images added to product ID "+id+" successfully");
	}
		
	
	
	
	

}
