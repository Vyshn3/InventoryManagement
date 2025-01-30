import React from 'react';
import '../CSS/HomeComponent.css'; 

function NavComponent() {
    return (
    <nav class="navbar navbar-expand-lg navbar-dark">
	  <a class="navbar-brand" href="/">Product Management</a>
	  <div class="collapse navbar-collapse" id="navbarNavDropdown">
	    <ul class="navbar-nav">
	      <li class="nav-item active">
	        <a class="nav-link" href="/">Home <span class="sr-only"></span></a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="/api/products">Products</a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="/api/products/add">Add Product</a>
	      </li>
  		  <li class="nav-item">
  		  	 <a class="nav-link" href="/api/products/update">Update Product</a>
  		 </li>
  		 <li class="nav-item">
  		 	<a class="nav-link" href="/api/products/delete">Delete Product</a>
  		 </li>
	    </ul>
	  </div>
	</nav>
   

)};

export default NavComponent;