**🚀 Overview**

The Product Management System is a **full-stack web application** designed to efficiently manage product inventory. It provides core functionalities such as adding, updating, deleting, searching, and filtering products. The application follows best practices for data validation, error handling, and RESTful API design to ensure a seamless user experience.

🔹 **Features**

CRUD Operations – Add, update, delete, and fetch products

Search & Filter Products: Powerful search functionality by product name and filter by price range.

Low-Stock Management: Identifies products with low stock to ensure timely restocking.

Global Error Handling: Comprehensive error handling using Spring’s @RestControllerAdvice for validation and constraint violations.

Layered Architecture: Follows best practices with separation of concerns into Controller, Service, DAO, and Model layers for maintainability.

CORS Enabled: Seamless communication between the frontend and backend.

Bulk Updates: Efficiently manage multiple products with bulk update functionality.

Product Categorization: Classify products into categories for better organization.

Activation/Deactivation: Enable or disable products as required.

🔮 **Future Enhancements**

JWT-based Authentication & Authorization

Role-based Access Control (RBAC)

Real-time Analytics Dashboard

Cloud Deployment (AWS/GCP)

🛠 **Tech Stack**

**Frontend:**

React.js – Component-based UI development

React Router – Seamless navigation

Bootstrap, HTML5, CSS3, Flexbox – Modern UI styling

Axios – Handling API requests

**Backend:**

Java – Primary programming language

Spring Boot – Backend framework

Spring Data JPA – ORM for database interactions

Hibernate – Object-relational mapping

Spring Validation – Data validation framework

Spring Security (Upcoming Feature) – Secure authentication and authorization

Lombok – Simplified Java coding with annotations

**Database:**

MySQL – Relational database for product storage

**Other Tools & Technologies:**

RESTful APIs – Standardized API design

Postman – API testing and debugging

Git/GitHub – Version control

**API Endpoints**

Product Management

POST /api/products/add - Add a new product

GET /api/products - Fetch all products

GET /api/products/getByID/{id} - Fetch product by ID

PUT /api/products/update/{id} - Update an existing product

DELETE /api/products/delete/{id} - Delete a product

GET /api/products/search - Search for a product by name

GET /api/products/filter - Filter products by price range

GET /api/products/low-stock - Fetch products with low stock
