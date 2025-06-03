import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import { commonProducts } from '../utils.js';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Get unique genres for the filter dropdown
  const genres = [...new Set(
    commonProducts
      .filter((product) => product && typeof product === 'object')
      .map((product) => product.genre)
      .filter((genre) => genre)
  )];

  // Filter products based on search and filter criteria
  const filteredProducts = commonProducts.filter((product) => {
    if (!product || typeof product !== 'object') return false;

    // Search filter (case-insensitive)
    const productTitle = (product.title || '').trim().toLowerCase();
    const query = (searchQuery || '').trim().toLowerCase();
    const matchesSearch = query ? productTitle.includes(query) : true;

    // Price filter
    const min = minPrice && !isNaN(parseFloat(minPrice)) ? parseFloat(minPrice) : -Infinity;
    const max = maxPrice && !isNaN(parseFloat(maxPrice)) ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = (product.price || 0) >= min && (product.price || 0) <= max;

    // Genre filter
    const matchesGenre = selectedGenre ? (product.genre || '').trim() === selectedGenre.trim() : true;

    return matchesSearch && matchesPrice && matchesGenre;
  });

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return (a.price || 0) - (b.price || 0);
      case 'price-high-low':
        return (b.price || 0) - (a.price || 0);
      case 'name-a-z':
        return (a.title || '').localeCompare(b.title || '');
      case 'name-z-a':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return 0;
    }
  });

  return (
    <div className="container">
      <h1>Products</h1>

      {/* Search, Filter, and Sort Section */}
      <div className="search-filter-sort">
        {/* Search Bar */}
        <div className="form-group">
          <label htmlFor="search">Search Products:</label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter book title..."
          />
        </div>

        {/* Price Range Filter */}
        <div className="form-group price-range">
          <label>Price Range:</label>
          <div className="price-inputs">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              min="0"
            />
            <span className="price-range-separator">-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              min="0"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="form-group">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Title: A to Z</option>
            <option value="name-z-a">Title: Z to A</option>
          </select>
        </div>
      </div>

      {/* Pass sorted and filtered products to ProductList */}
      <ProductList products={sortedProducts} />
    </div>
  );
};

export default Home;