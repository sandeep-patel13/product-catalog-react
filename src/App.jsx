import { useEffect, useState } from 'react'
import './App.css'
import Products from './products'
import Categories from './Categories';

function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {

    // Fetch products 
    fetch('http://localhost:7000/api/products')
      .then(response => response.json())
      .then(data => { setProducts(data) });

    // Fetch Categories 
    fetch('http://localhost:7000/api/categories')
      .then(response => response.json())
      .then(data => { setCategories(data) })
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  const filteredProducts = products
    .filter(product => {
      let categoryFilter = true;
      let searchFilter = true;

      // Set value of categoryFilter 
      if (selectedCategory) {
        categoryFilter = product.category.id == selectedCategory;
      }

      // Set value of searchFilter 
      if (searchTerm != "") {
        searchFilter = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return (
        categoryFilter && searchFilter
      );
    })
    .sort((product1, product2) => sortOrder == 'asc' ? product1.price - product2.price : product2.price - product1.price);



  return (
    <div className='container'>
      <h1 className='my-4'>Product Catalog</h1>

      {/* Filter products  */}
      <div className='row align-items-center mb-4'>
        {/* Category filter  */}
        <div className='col-md-3 col-sm-12 mb-12'>
          <Categories categories={categories} onSelect={handleCategorySelect} />
        </div>

        {/* Search bar  */}
        <div className='col-md-5 col-sm-12 mb-2'>
          <input
            type="text"
            className='form-control'
            placeholder='Search Products'
            onChange={handleSearchChange}
          >
          </input>
        </div>

        {/* Sort by price  */}
        <div className='col-md-4 col-sm-12 mb-2'>
          <select
            className='form-control'
            onChange={handleSortChange}>
            <option value="asc">Sort by price: Low to High</option>
            <option value="desc">Sort by price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products container  */}
      <div>
        {filteredProducts.length ? (
          <Products products={filteredProducts} />
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  )
}

export default App
