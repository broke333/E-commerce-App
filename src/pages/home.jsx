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
  const sortedProducts = (filteredProducts).sort((a, b) => {
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
    <>
      {/* Main Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-10 h-screen relative">
        {/* Sidebar Section (Filters) */}
        <div className="col-span-1 md:col-span-2 max-w-[2000px] mx-auto px-4 py-6 sticky top-0 h-fit bg-white shadow-md sticky">
          <h1 className="text-2xl font-bold mb-8">Products</h1>

          {/* Search, Filter, and Sort Section */}
          <div className="grid grid-rows gap-6 mb-8">
            {/* Search Bar */}
            <div className="w-full">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products:
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter book title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Range Filter */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range:
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  min="0"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  min="0"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="w-full">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Genre:
              </label>
              <select
                id="genre"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Genres</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="w-full">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Title: A to Z</option>
                <option value="name-z-a">Title: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products List Section */}
        <div className="col-span-1 md:col-span-8 bg-gray-100 overflow-y-auto">
          <div className="w-full max-w-[2000px] mx-auto px-4 py-6">
            <ProductList products={sortedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;