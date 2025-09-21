import React, { useState } from 'react';

const SalesReports = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  const salesData = {
    daily: { total: 24500, orders: 8, growth: 5 },
    weekly: { total: 125600, orders: 42, growth: 12 },
    monthly: { total: 485600, orders: 156, growth: 8 },
    yearly: { total: 3856000, orders: 1245, growth: 15 }
  };

  const productSales = [
    { name: 'Exide Battery 60Ah', sales: 45, revenue: 382500 },
    { name: 'Yamaha 70cc Bike', sales: 12, revenue: 1020000 },
    { name: 'Loader Rikshaw', sales: 8, revenue: 1480000 },
    { name: 'Amaron Battery 75Ah', sales: 22, revenue: 209000 }
  ];

  const currentData = salesData[timeRange];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sales Reports</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
              ₹
            </div>
            <span className="text-sm font-medium text-green-600">+{currentData.growth}%</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-800">₹{currentData.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl mb-4">
            🛒
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{currentData.orders}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4">
            📈
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Growth Rate</p>
            <p className="text-2xl font-bold text-gray-800">+{currentData.growth}%</p>
          </div>
        </div>
      </div>

      {/* Product-wise Sales */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Product-wise Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Product</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Units Sold</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {productSales.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 text-sm text-gray-600">{product.sales} units</td>
                  <td className="py-3 text-sm text-gray-600">₹{product.revenue.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-600">
                    {Math.round((product.revenue / 3856000) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Report</h3>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Download PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Export Excel
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;