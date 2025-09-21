import React, { useState } from 'react';

const StockCheck = () => {
  const [products] = useState([
    { id: 1, name: 'Exide Battery 60Ah', category: 'Batteries', stock: 45, price: 8500, lowStock: false },
    { id: 2, name: 'Amaron Battery 75Ah', category: 'Batteries', stock: 22, price: 9500, lowStock: false },
    { id: 3, name: 'Yamaha 70cc Bike', category: 'Bikes', stock: 12, price: 85000, lowStock: false },
    { id: 4, name: 'Loader Rikshaw', category: 'Rikshaws', stock: 8, price: 185000, lowStock: true },
    { id: 5, name: 'Solar Battery 100Ah', category: 'Batteries', stock: 5, price: 12500, lowStock: true }
  ]);

  const [lowStockOnly, setLowStockOnly] = useState(false);

  const filteredProducts = lowStockOnly 
    ? products.filter(product => product.lowStock)
    : products;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Stock Check</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={() => setLowStockOnly(!lowStockOnly)}
            className="mr-2"
          />
          Show low stock only
        </label>
      </div>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Products</div>
          <div className="text-2xl font-bold text-gray-800">{products.length}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">In Stock</div>
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.stock > 0).length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Low Stock</div>
          <div className="text-2xl font-bold text-yellow-600">
            {products.filter(p => p.lowStock).length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Out of Stock</div>
          <div className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.stock} units</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">₹{product.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    {product.lowStock ? (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Low Stock</span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">In Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Request Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      {products.filter(p => p.lowStock).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {products.filter(p => p.lowStock).length} product(s) are running low on stock. 
                  Please consider placing a restock order.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCheck;