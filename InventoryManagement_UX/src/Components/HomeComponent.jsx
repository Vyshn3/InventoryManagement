import React from 'react';
import '../CSS/HomeComponent.css'; 
import NavComponent from './NavComponent';

function HomeComponent() {
    const functionalities = [
        { title: "Add New Product", description: "Allows adding a new product to the inventory with all necessary details.", href: "/api/products/add" },
        { title: "Get All Products", description: "Fetch a complete list of all products available in the inventory.", href: "/api/products" },
        { title: "Update Product", description: "Modify product information, such as name, price, or category.", href: "/api/products/update" },
        { title: "Delete Product", description: "Remove a specific product from the inventory permanently.", href: "/api/products/delete" },
        { title: "Get Product by ID", description: "Retrieve detailed information about a product using its unique ID.", href: "api/products/getByID" },
        { title: "Search Product by Name", description: "Find products in the inventory by their name or keyword.", href: "/api/products/search" },
        { title: "Filter Products by Price", description: "Sort and filter products based on price range or criteria.", href: "/api/products/filter" },
        { title: "Low Stock Products", description: "Identify and view products that are running low on stock.", href: "/api/products/low-stock" },
        { title: "Bulk Update Quantities", description: "Update stock quantities for multiple products simultaneously.", href: "/api/products/bulk-update-quantities" },
        { title: "Bulk Delete Products", description: "Remove multiple products from the inventory in one action.", href: "/api/products/bulk-delete" },
        { title: "Mark as Featured", description: "Highlight specific products as featured for better visibility.", href: "/api/products/mark-featured" },
        { title: "View Featured Products", description: "Display a list of all products marked as featured.", href: "/api/products/featured" },
        { title: "Activate Product", description: "Enable a product to make it available for purchase.", href: "/activate-product" },
        { title: "Deactivate Product", description: "Disable a product to temporarily hide it from customers.", href: "/api/products/deactivate" },
        { title: "Products by Category", description: "Group and view products based on their assigned category.", href: "/api/products/category" },
        { title: "Recently Added Products", description: "List products that were recently added to the inventory.", href: "/api/products/recent" },
        { title: "Add Product Images", description: "Upload and associate images with a specific product.", href: "/api/products/images" },
    ];

    return (
        <>
            <NavComponent />
            <div className="container my-5">
                <h1 className="text-center mb-4">Product Management Dashboard</h1>
                <div className="row g-4">
                    {functionalities.map((func, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card card-hover default-card-size d-flex flex-column text-center h-100 card-design">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{func.title}</h5>
                                    <p className="card-text">{func.description}</p>
                                    <div className="mt-auto">
                                        <a href={func.href} className="btn btn-secondary btn-sm text-decoration-none">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomeComponent;
