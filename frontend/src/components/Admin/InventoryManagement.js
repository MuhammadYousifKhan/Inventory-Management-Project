import React, { useState } from 'react';

const InventoryManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Exide Battery 60Ah', category: 'Batteries', stock: 45, price: 8500, lowStock: false, sku: 'BAT-001', lastUpdated: '2024-01-15', cost: 6500, supplier: 'Exide Ltd' },
    { id: 2, name: 'Yamaha 70cc Bike', category: 'Bikes', stock: 12, price: 85000, lowStock: false, sku: 'BIK-001', lastUpdated: '2024-01-14', cost: 72000, supplier: 'Yamaha Motors' },
    { id: 3, name: 'Loader Rikshaw', category: 'Rikshaws', stock: 8, price: 185000, lowStock: true, sku: 'RIK-001', lastUpdated: '2024-01-13', cost: 160000, supplier: 'Mahindra Auto' },
    { id: 4, name: 'Amaron Battery 75Ah', category: 'Batteries', stock: 22, price: 9500, lowStock: false, sku: 'BAT-002', lastUpdated: '2024-01-12', cost: 7500, supplier: 'Amaron Inc' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Batteries',
    stock: 0,
    price: 0,
    cost: 0,
    sku: '',
    supplier: ''
  });

  // Stats cards data
  const stats = [
    { 
      title: 'Total Products', 
      value: products.length, 
      icon: '📦', 
      color: 'bg-blue-500', 
      change: '+5%', 
      description: 'Across all categories' 
    },
    { 
      title: 'Total Inventory Value', 
      value: `₹${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}`, 
      icon: '💰', 
      color: 'bg-green-500', 
      change: '+12%', 
      description: 'At retail prices' 
    },
    { 
      title: 'Low Stock Items', 
      value: products.filter(p => p.lowStock).length, 
      icon: '⚠️', 
      color: 'bg-orange-500', 
      change: '+2', 
      description: 'Needs restocking' 
    },
    { 
      title: 'Out of Stock', 
      value: products.filter(p => p.stock === 0).length, 
      icon: '❌', 
      color: 'bg-red-500', 
      change: '+0', 
      description: 'Urgent attention needed' 
    }
  ];

  // Filter products based on search, category, and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'In Stock' && !product.lowStock && product.stock > 0) ||
                         (selectedStatus === 'Low Stock' && product.lowStock && product.stock > 0) ||
                         (selectedStatus === 'Out of Stock' && product.stock === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort products
  const sortedProducts = React.useMemo(() => {
    let sortableItems = [...filteredProducts];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredProducts, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProductWithId = {
      ...newProduct,
      id: products.length + 1,
      lowStock: newProduct.stock < 10,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProductWithId]);
    setNewProduct({ name: '', category: 'Batteries', stock: 0, price: 0, cost: 0, sku: '', supplier: '' });
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({...product});
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => 
      p.id === editingProduct.id ? {...editingProduct, lowStock: editingProduct.stock < 10} : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleStockUpdate = (id, newStock) => {
    setProducts(products.map(product => 
      product.id === id ? {...product, stock: newStock, lowStock: newStock < 10, lastUpdated: new Date().toISOString().split('T')[0]} : product
    ));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', class: 'bg-red-100 text-red-800' };
    if (stock < 5) return { text: 'Very Low', class: 'bg-red-100 text-red-800' };
    if (stock < 10) return { text: 'Low Stock', class: 'bg-orange-100 text-orange-800' };
    return { text: 'In Stock', class: 'bg-green-100 text-green-800' };
  };

  const categories = ['All', 'Batteries', 'Bikes', 'Rikshaws'];
  const statusOptions = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  // Calculate inventory metrics
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalCostValue = products.reduce((sum, p) => sum + (p.cost * p.stock), 0);
  const potentialProfit = totalInventoryValue - totalCostValue;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Manage your product inventory and stock levels</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Cards - MOVED TO TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl transition-all duration-300 hover:scale-110`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium">Total Inventory Value</span>
              <span className="text-blue-600">💰</span>
            </div>
            <p className="text-2xl font-bold text-blue-800 mt-2">₹{totalInventoryValue.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">At retail prices</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-purple-800 font-medium">Inventory Cost</span>
              <span className="text-purple-600">📊</span>
            </div>
            <p className="text-2xl font-bold text-purple-800 mt-2">₹{totalCostValue.toLocaleString()}</p>
            <p className="text-sm text-purple-600 mt-1">At cost prices</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">Potential Profit</span>
              <span className="text-green-600">📈</span>
            </div>
            <p className="text-2xl font-bold text-green-800 mt-2">₹{potentialProfit.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">If all inventory sold</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Add New Product</h3>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
              <input
                type="text"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g., BAT-001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Batteries">Batteries</option>
                <option value="Bikes">Bikes</option>
                <option value="Rikshaws">Rikshaws</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <input
                type="text"
                value={newProduct.supplier}
                onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Supplier name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price (₹) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newProduct.cost}
                onChange={(e) => setNewProduct({...newProduct, cost: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-3 pt-4">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Add Product
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-yellow-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
            <button 
              onClick={() => setEditingProduct(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
              <input
                type="text"
                value={editingProduct.sku}
                onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Batteries">Batteries</option>
                <option value="Bikes">Bikes</option>
                <option value="Rikshaws">Rikshaws</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <input
                type="text"
                value={editingProduct.supplier}
                onChange={(e) => setEditingProduct({...editingProduct, supplier: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Supplier name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                min="0"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={editingProduct.cost}
                onChange={(e) => setEditingProduct({...editingProduct, cost: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-3 pt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Update Product
              </button>
              <button 
                type="button" 
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('sku')}
                >
                  SKU {sortConfig.key === 'sku' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Product {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('category')}
                >
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('stock')}
                >
                  Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('cost')}
                >
                  Cost {sortConfig.key === 'cost' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('price')}
                >
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  const margin = product.price - product.cost;
                  const marginPercent = product.cost > 0 ? ((margin / product.cost) * 100).toFixed(1) : 0;
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.sku}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.supplier}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">{product.stock} units</div>
                          <button 
                            onClick={() => {
                              const newStock = prompt(`Update stock for ${product.name}`, product.stock);
                              if (newStock !== null && !isNaN(newStock)) {
                                handleStockUpdate(product.id, parseInt(newStock));
                              }
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            📝
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">₹{product.cost.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-green-800">
                          ₹{margin.toLocaleString()} ({marginPercent}%)
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.class}`}>
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{product.lastUpdated}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-800">
              {products.filter(p => !p.lowStock && p.stock > 0).length}
            </div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-800">
              {products.filter(p => p.lowStock && p.stock > 0).length}
            </div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-800">
              {products.filter(p => p.stock === 0).length}
            </div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;