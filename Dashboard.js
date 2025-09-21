import React, { useState } from 'react';
import Header from '../Common/Header';
import InventoryManagement from './InventoryManagement';
import SalesReports from './SalesReports';
import ManagerControl from './ManagerControl';
import InvoiceSystem from './InvoiceSystem';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Products', value: '248', icon: '📦', color: 'bg-blue-500', change: '+12%' },
    { title: 'Monthly Sales', value: '₹1,24,856', icon: '💰', color: 'bg-green-500', change: '+8%' },
    { title: 'New Orders', value: '24', icon: '🛒', color: 'bg-orange-500', change: '+5%' },
    { title: 'Managers', value: '3', icon: '👥', color: 'bg-purple-500', change: '+0%' }
  ];

  // Sample sales data for the last 6 months with realistic values
  const monthlySalesData = [
    { month: 'Jan', sales: 95000, orders: 120, target: 110000, profit: 28500 },
    { month: 'Feb', sales: 105000, orders: 135, target: 100000, profit: 31500 },
    { month: 'Mar', sales: 115000, orders: 145, target: 120000, profit: 34500 },
    { month: 'Apr', sales: 108000, orders: 130, target: 115000, profit: 32400 },
    { month: 'May', sales: 124856, orders: 155, target: 120000, profit: 37457 },
    { month: 'Jun', sales: 132000, orders: 165, target: 125000, profit: 39600 }
  ];

  // Top selling products with realistic data
  const topProducts = [
    { name: '48V Battery', sales: 45, revenue: 450000, growth: '+15%', icon: '🔋' },
    { name: '60V Battery', sales: 38, revenue: 418000, growth: '+8%', icon: '🔌' },
    { name: 'E-Rikshaw', sales: 12, revenue: 360000, growth: '+22%', icon: '🛺' },
    { name: 'E-Bike', sales: 18, revenue: 270000, growth: '+12%', icon: '🚲' },
    { name: 'Charger', sales: 56, revenue: 112000, growth: '+5%', icon: '⚡' }
  ];

  // Weekly sales data
  const weeklySalesData = [
    { day: 'Mon', sales: 18000, online: 12000, offline: 6000 },
    { day: 'Tue', sales: 22000, online: 15000, offline: 7000 },
    { day: 'Wed', sales: 24000, online: 16000, offline: 8000 },
    { day: 'Thu', sales: 21000, online: 13000, offline: 8000 },
    { day: 'Fri', sales: 28000, online: 19000, offline: 9000 },
    { day: 'Sat', sales: 32000, online: 22000, offline: 10000 },
    { day: 'Sun', sales: 25000, online: 17000, offline: 8000 }
  ];

  // Customer demographics
  const customerData = [
    { type: 'Retail', value: 65, color: 'bg-blue-500', icon: '🛍️' },
    { type: 'Wholesale', value: 25, color: 'bg-green-500', icon: '📦' },
    { type: 'Corporate', value: 10, color: 'bg-purple-500', icon: '🏢' }
  ];

  // Calculate max values for scaling
  const maxSales = Math.max(...monthlySalesData.map(item => item.sales));
  const maxTarget = Math.max(...monthlySalesData.map(item => item.target));
  const maxWeeklySales = Math.max(...weeklySalesData.map(item => item.sales));
  const maxProfit = Math.max(...monthlySalesData.map(item => item.profit));

  // Function to generate line chart points
  const generateLinePath = (data, valueKey, maxValue, color) => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item[valueKey] / maxValue) * 100);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        className="transition-all duration-300"
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManagement />;
      case 'reports':
        return <SalesReports />;
      case 'managers':
        return <ManagerControl />;
      case 'invoices':
        return <InvoiceSystem />;
      default:
        return (
          <>
            {/* Stats Cards */}
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
                  </div>
                </div>
              ))}
            </div>

            {/* Sales Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Sales Line Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Monthly Sales Trend</h3>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sales</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Profit</span>
                  </div>
                </div>
                <div className="h-64 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Gradient background */}
                    <defs>
                      <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((line) => (
                      <line
                        key={line}
                        x1="0"
                        y1={line}
                        x2="100"
                        y2={line}
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                    ))}
                    
                    {/* Area under sales line */}
                    <path
                      d={`M 0,100 ${monthlySalesData.map((data, index) => {
                        const x = (index / (monthlySalesData.length - 1)) * 100;
                        const y = 100 - ((data.sales / maxSales) * 100);
                        return `L ${x},${y}`;
                      }).join(' ')} L 100,100 Z`}
                      fill="url(#salesGradient)"
                    />
                    
                    {/* Area under profit line */}
                    <path
                      d={`M 0,100 ${monthlySalesData.map((data, index) => {
                        const x = (index / (monthlySalesData.length - 1)) * 100;
                        const y = 100 - ((data.profit / maxProfit) * 100);
                        return `L ${x},${y}`;
                      }).join(' ')} L 100,100 Z`}
                      fill="url(#profitGradient)"
                    />
                    
                    {/* Sales line */}
                    {generateLinePath(monthlySalesData, 'sales', maxSales, '#3b82f6')}
                    
                    {/* Profit line */}
                    {generateLinePath(monthlySalesData, 'profit', maxProfit, '#10b981')}
                    
                    {/* Data points */}
                    {monthlySalesData.map((data, index) => {
                      const x = (index / (monthlySalesData.length - 1)) * 100;
                      const ySales = 100 - ((data.sales / maxSales) * 100);
                      const yProfit = 100 - ((data.profit / maxProfit) * 100);
                      
                      return (
                        <g key={index}>
                          <circle cx={x} cy={ySales} r="3" fill="#3b82f6" stroke="white" strokeWidth="1.5" className="transition-all duration-300 hover:r-4" />
                          <circle cx={x} cy={yProfit} r="3" fill="#10b981" stroke="white" strokeWidth="1.5" className="transition-all duration-300 hover:r-4" />
                          <text x={x} y="98" textAnchor="middle" fontSize="3" fill="#6b7280" fontWeight="bold">{data.month}</text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 py-2">
                    <span>₹{maxSales.toLocaleString()}</span>
                    <span>₹{Math.round(maxSales/2).toLocaleString()}</span>
                    <span>₹0</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Total Sales: ₹{monthlySalesData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Customer Demographics */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Demographics</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    {/* Pie chart */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {(() => {
                        let cumulativePercent = 0;
                        return customerData.map((data, index) => {
                          const percent = data.value;
                          const startX = 50 + 50 * Math.cos(2 * Math.PI * cumulativePercent / 100);
                          const startY = 50 + 50 * Math.sin(2 * Math.PI * cumulativePercent / 100);
                          cumulativePercent += percent;
                          const endX = 50 + 50 * Math.cos(2 * Math.PI * cumulativePercent / 100);
                          const endY = 50 + 50 * Math.sin(2 * Math.PI * cumulativePercent / 100);
                          
                          const largeArcFlag = percent > 50 ? 1 : 0;
                          
                          return [
                            <path
                              key={index}
                              d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                              fill={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#8b5cf6'}
                              className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                            />,
                            <text
                              key={`text-${index}`}
                              x={50 + 30 * Math.cos(2 * Math.PI * (cumulativePercent - percent / 2) / 100)}
                              y={50 + 30 * Math.sin(2 * Math.PI * (cumulativePercent - percent / 2) / 100)}
                              textAnchor="middle"
                              fontSize="5"
                              fill="white"
                              fontWeight="bold"
                            >
                              {percent}%
                            </text>
                          ];
                        });
                      })()}
                      <circle cx="50" cy="50" r="30" fill="white" />
                      <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="6" fontWeight="bold" fill="#4b5563">
                        Customers
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {customerData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-lg mb-1">{data.icon}</span>
                      <div className={`w-3 h-3 rounded-full ${data.color} mb-1`}></div>
                      <span className="text-xs font-medium text-gray-700">{data.type}</span>
                      <span className="text-xs text-gray-500">{data.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Top Selling Products</h3>
                  <span className="text-sm text-blue-600 font-medium">View All →</span>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl">
                          {product.icon}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">₹{product.revenue.toLocaleString()}</p>
                        <p className={`text-sm font-medium ${product.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales vs Orders */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Sales vs Orders</h3>
                <div className="h-64">
                  <div className="flex items-end justify-between h-48 mb-4">
                    {monthlySalesData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center w-1/6 group">
                        <div className="flex items-end w-full justify-center space-x-1">
                          <div 
                            className="w-1/2 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-300 group-hover:from-green-600 group-hover:to-green-500 relative"
                            style={{ height: `${(data.sales / maxSales) * 100}%` }}
                          >
                            <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                              ₹{data.sales.toLocaleString()}
                            </div>
                          </div>
                          <div 
                            className="w-1/2 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-md transition-all duration-300 group-hover:from-orange-600 group-hover:to-orange-500 relative"
                            style={{ height: `${(data.orders / 200) * 100}%` }}
                          >
                            <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                              {data.orders} orders
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2 group-hover:font-medium">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 px-2">
                    <span>0</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded mr-2"></div>
                    <span className="text-xs text-gray-600">Sales (₹)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded mr-2"></div>
                    <span className="text-xs text-gray-600">Orders (count)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-blue-800">Conversion Rate</h4>
                    <span className="text-blue-600 text-lg">📊</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 mt-2">4.8%</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '48%'}}></div>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">+1.2% from last month</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-green-800">Customer Satisfaction</h4>
                    <span className="text-green-600 text-lg">⭐</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 mt-2">94%</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">+3% from last quarter</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-purple-800">Inventory Turnover</h4>
                    <span className="text-purple-600 text-lg">🔄</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800 mt-2">5.2x</p>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                  <p className="text-sm text-purple-600 mt-2">+0.8x from last year</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                <span className="text-sm text-blue-600 font-medium">View All →</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New order #ORD1005 received</p>
                    <p className="text-sm text-gray-600">2 hours ago • ₹8,500</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <span className="text-sm">+</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New stock added - 12 Batteries</p>
                    <p className="text-sm text-gray-600">5 hours ago • by Manager Ali</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <span className="text-sm">$</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Monthly sales target achieved</p>
                    <p className="text-sm text-gray-600">1 day ago • ₹1,24,856</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg transition-all duration-300 hover:bg-yellow-100">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <span className="text-sm">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Customer review received - 5 stars</p>
                    <p className="text-sm text-gray-600">2 days ago • by Rajesh Kumar</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-blue-200 hover:text-white transition-colors duration-200">
              ✕
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'dashboard' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700'
                  }`}
                >
                  <span className="text-lg">📊</span>
                  <span>Dashboard</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'inventory' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700'
                  }`}
                >
                  <span className="text-lg">📦</span>
                  <span>Inventory</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'reports' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700'
                  }`}
                >
                  <span className="text-lg">📈</span>
                  <span>Sales Reports</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'invoices' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700'
                  }`}
                >
                  <span className="text-lg">🧾</span>
                  <span>Invoices</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('managers')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'managers' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-700'
                  }`}
                >
                  <span className="text-lg">👥</span>
                  <span>Manager Control</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        
        {/* Toggle Sidebar Button */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="fixed top-20 left-4 bg-blue-600 text-white p-2 rounded-lg z-10 transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            ☰
          </button>
        )}

        <div className="p-6">
          {activeTab !== 'dashboard' && (
            <div className="mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
          
          {activeTab === 'dashboard' && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
              <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
            </div>
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;