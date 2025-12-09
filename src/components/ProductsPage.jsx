import React from 'react';
import { Search, Filter, ChevronDown, Grid, List, Package } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductsPage = ({ 
  products,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  priceFilter,
  setPriceFilter,
  setSelectedProduct,
  addToCart
}) => {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Our Products</h1>
        
        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 sm:p-4 mb-4">
          {/* Search and Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-3">
            {/* Search Bar */}
            <div className="lg:col-span-5">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition text-gray-900"
                />
              </div>
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition bg-white text-gray-900"
              >
                <option value="all">All Prices</option>
                <option value="under500">Under PKR 500</option>
                <option value="500-1000">PKR 500 - 1000</option>
                <option value="over1000">Over PKR 1000</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition bg-white text-gray-900"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="lg:col-span-1 flex items-center justify-end">
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-yellow-500 text-black font-semibold shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-yellow-500 text-black font-semibold shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{products.length}</span> product{products.length !== 1 ? 's' : ''}
              {searchQuery && <span> matching "<span className="font-semibold text-yellow-600">{searchQuery}</span>"</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {products.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-md border border-gray-200">
          <Package size={48} className="mx-auto mb-3 text-gray-300" />
          <p className="text-lg sm:text-xl text-gray-600 mb-2">No products found</p>
          <p className="text-sm text-gray-500 px-4">
            {searchQuery || priceFilter !== 'all' 
              ? 'Try adjusting your filters or search query'
              : 'Please add products from the admin panel'}
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5' : 'space-y-4'}>
          {products.map(product => (
            <ProductCard 
              key={product._id || product.id}
              //key={product.id} 
              product={product} 
              viewMode={viewMode} 
              onProductClick={setSelectedProduct}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;