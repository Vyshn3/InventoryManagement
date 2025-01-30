package com.example.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Model.Product;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {

	List<Product> findByName(String name);

	List<Product> findByCategoryId(long categoryId);
	List<Product> findByPriceBetween(double minPrice, double maxPrice);

	
	@Query(value = "SELECT * FROM Product ORDER BY created_date DESC LIMIT 1",nativeQuery=true)
	Product findByCreatedDate();
	
	

}
