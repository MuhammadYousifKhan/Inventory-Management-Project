import React, { useState } from 'react';

const SalesReports = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });
  const [viewMode, setViewMode] = useState('overview'); // overview, comparative, geographical
  
  const salesData = {
    daily: { 
      total: 24500, 
      orders: 8, 
      growth: 5,
      averageOrder: 3062.50,
      returns: 2,
      netSales: 22500,
      newCustomers: 3,
      repeatCustomers: 5
    },
    weekly: { 
      total: 125600, 
      orders: 42, 
      growth: 12,
      averageOrder: 2990.48,
      returns: 5,
      netSales: 118600,
      newCustomers: 18,
      repeatCustomers: 24
    },
    monthly: { 
      total: 485600, 
      orders: 156, 
      growth: 8,
      averageOrder: 3112.82,
      returns: 12,
      netSales: 455600,
      newCustomers: 65,
      repeatCustomers: 91
    },
    yearly: { 
      total: 3856000, 
      orders: 1245, 
      growth: 15,
      averageOrder: 3096.39,
      returns: 45,
      netSales: 3626000,
      newCustomers: 520,
      repeatCustomers: 725
    }
  };

  const productSales = [
    { name: 'Exide Battery 60Ah', sales: 45, revenue: 382500, growth: 12, category: 'Batteries', stock: 15 },
    { name: 'Yamaha 70cc Bike', sales: 12, revenue: 1020000, growth: 8, category: 'Bikes', stock: 8 },
    { name: 'Loader Rikshaw', sales: 8, revenue: 1480000, growth: 22, category: 'Rikshaws', stock: 3 },
    { name: 'Amaron Battery 75Ah', sales: 22, revenue: 209000, growth: 5, category: 'Batteries', stock: 18 },
    { name: 'E-Bike Premium', sales: 15, revenue: 675000, growth: 18, category: 'Bikes', stock: 6 },
    { name: '48V Charger', sales: 56, revenue: 112000, growth: 3, category: 'Accessories', stock: 42 }
  ];

  const salesTeamPerformance = [
    { name: 'Rajesh Kumar', target: 500000, achieved: 625000, incentive: 12500, growth: 25 },
    { name: 'Priya Singh', target: 450000, achieved: 485000, incentive: 7000, growth: 8 },
    { name: 'Amit Sharma', target: 480000, achieved: 552000, incentive: 10800, growth: 15 },
    { name: 'Sneha Patel', target: 520000, achieved: 598000, incentive: 11700, growth: 15 },
    { name: 'Vikram Yadav', target: 460000, achieved: 414000, incentive: 0, growth: -10 }
  ];

  const seasonalTrends = [
    { month: 'Jan', sales: 385600, factor: 'Post-holiday slump' },
    { month: 'Feb', sales: 412500, factor: 'Spring demand' },
    { month: 'Mar', sales: 458900, factor: 'Festival season' },
    { month: 'Apr', sales: 395200, factor: 'Summer slowdown' },
    { month: 'May', sales: 485600, factor: 'Pre-monsoon demand' },
    { month: 'Jun', sales: 520400, factor: 'Monsoon essentials' }
  ];

  const currentData = salesData[timeRange];
  const totalRevenue = productSales.reduce((sum, product) => sum + product.revenue, 0);

  // Calculate performance rating
  const getPerformanceRating = (growth) => {
    if (growth >= 20) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (growth >= 10) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (growth >= 0) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sales Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive sales performance insights</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'overview' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setViewMode('comparative')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'comparative' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              Comparative
            </button>
            <button 
              onClick={() => setViewMode('geographical')}
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'geographical' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              Geographical
            </button>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              ₹
            </div>
            <span className={`text-sm font-medium ${currentData.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentData.growth >= 0 ? '+' : ''}{currentData.growth}%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-800">₹{currentData.total.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Net: ₹{currentData.netSales.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
              🛒
            </div>
            <span className="text-sm font-medium text-gray-600">{currentData.returns} returns</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{currentData.orders}</p>
            <p className="text-xs text-gray-500 mt-1">Avg: ₹{currentData.averageOrder.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4">
            👥
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Customer Ratio</p>
            <p className="text-2xl font-bold text-gray-800">{Math.round((currentData.repeatCustomers / currentData.orders) * 100)}%</p>
            <p className="text-xs text-gray-500 mt-1">{currentData.repeatCustomers} repeat / {currentData.newCustomers} new</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl mb-4">
            🎯
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Target Achievement</p>
            <p className="text-2xl font-bold text-gray-800">92%</p>
            <p className="text-xs text-gray-500 mt-1">Based on monthly goal</p>
          </div>
        </div>
      </div>

    
     
      {/* Product-wise Sales */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Product-wise Sales Performance</h3>
          <span className="text-sm text-blue-600 font-medium">View All →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Units Sold</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Growth</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {productSales.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{product.sales} units</td>
                  <td className="py-3 text-sm font-medium text-gray-800">₹{product.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`text-xs font-medium ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {Math.round((product.revenue / totalRevenue) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sales Forecast */}
        

        {/* Export Options */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Reports</h3>
          <p className="text-gray-600 mb-6">Generate detailed sales reports for your records or analysis</p>
          
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📊</span>
                <span>Detailed Sales Report (PDF)</span>
              </div>
              <span>→</span>
            </button>
            
            <button className="flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📝</span>
                <span>Export to Excel (CSV)</span>
              </div>
              <span>→</span>
            </button>
            
            <button className="flex items-center justify-between p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">🖨️</span>
                <span>Print Summary Report</span>
              </div>
              <span>→</span>
            </button>
            
            <button className="flex items-center justify-between p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              <div className="flex items-center">
                <span className="text-lg mr-3">📧</span>
                <span>Email to Management</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;