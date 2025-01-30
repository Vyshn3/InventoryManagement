import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import ListProductComponent from './Components/ListProductComponent'; 
import AddProductComponent from './Components/AddProductComponent'
import DeleteProductComponent from './Components/DeleteProductComponent'
import UpdateProductComponent from './Components/UpdateProductComponent'
import GetProductByIDComponent from './Components/GetProductByIDComponent'
import SearchByNameComponent from './Components/SearchByNameComponent'
import FilterByPriceComponent from './Components/FilterByPriceComponent'
import LowStockProductComponent from './Components/LowStockProductComponent'

function App() {
  return (
    <div>
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="api/products" element={<ListProductComponent />} />
            <Route path="api/products/add" element={<AddProductComponent />} />
            <Route path="api/products/update" element={<UpdateProductComponent />} />
            <Route path="api/products/delete" element={<DeleteProductComponent />} />
            <Route path="api/products/getByID" element={<GetProductByIDComponent />} />
            <Route path="api/products/search" element={<SearchByNameComponent />} />
            <Route path="api/products/filter" element={<FilterByPriceComponent />} />
            <Route path="api/products/low-stock" element={<LowStockProductComponent />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
