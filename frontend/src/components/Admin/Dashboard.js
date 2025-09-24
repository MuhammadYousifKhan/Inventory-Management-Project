import React, { useState } from 'react';
import Header from '../Common/Header';
import InventoryManagement from './InventoryManagement';
import SalesReports from './SalesReports';
import ManagerControl from './ManagerControl';
import InvoiceSystem from './InvoiceSystem';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Store statistics
  const storeStats = [
    { title: 'Total Products', value: '248', icon: '📦', color: 'bg-blue-500', change: '+12%' },
    { title: 'Monthly Sales', value: '₹1,24,856', icon: '💰', color: 'bg-green-500', change: '+8%' },
    { title: 'New Orders', value: '24', icon: '🛒', color: 'bg-orange-500', change: '+5%' },
    { title: 'Managers', value: '3', icon: '👥', color: 'bg-purple-500', change: '+0%' }
  ];

  // Monthly sales data
  const monthlySalesData = [
    { month: 'Jan', sales: 95000, profit: 28500 },
    { month: 'Feb', sales: 105000, profit: 31500 },
    { month: 'Mar', sales: 115000, profit: 34500 },
    { month: 'Apr', sales: 108000, profit: 32400 },
    { month: 'May', sales: 124856, profit: 37457 },
    { month: 'Jun', sales: 132000, profit: 39600 }
  ];

  // Top selling products
  const topProducts = [
    { name: '48V Battery', sales: 45, revenue: 450000, growth: '+15%', icon: '🔋' },
    { name: '60V Battery', sales: 38, revenue: 418000, growth: '+8%', icon: '🔌' },
    { name: 'E-Rikshaw', sales: 12, revenue: 360000, growth: '+22%', icon: '🛺' },
    { name: 'E-Bike', sales: 18, revenue: 270000, growth: '+12%', icon: '🚲' },
    { name: 'Charger', sales: 56, revenue: 112000, growth: '+5%', icon: '⚡' }
  ];

  // Recent activities
  const recentActivities = [
    { type: 'order', message: 'New order #ORD1005 received', time: '2 hours ago', amount: '₹8,500', color: 'blue' },
    { type: 'stock', message: 'New stock added - 12 Batteries', time: '5 hours ago', by: 'Manager Ali', color: 'green' },
    { type: 'target', message: 'Monthly sales target achieved', time: '1 day ago', amount: '₹1,24,856', color: 'purple' },
    { type: 'review', message: 'Customer review received - 5 stars', time: '2 days ago', by: 'Rajesh Kumar', color: 'yellow' }
  ];

  // Calculate highest sales for chart scaling
  const highestSales = Math.max(...monthlySalesData.map(item => item.sales));
  const highestProfit = Math.max(...monthlySalesData.map(item => item.profit));

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
            {/* Store Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {storeStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sales Performance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Monthly Sales Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Monthly Sales Performance</h3>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      Sales
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      Profit
                    </span>
                  </div>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="h-64 mb-4">
                  <div className="flex items-end justify-between h-48 space-x-2">
                    {monthlySalesData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1 group">
                        <div className="flex items-end justify-center w-full space-x-1">
                          {/* Sales Bar */}
                          <div className="relative">
                            <div 
                              className="w-6 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                              style={{ height: `${(data.sales / highestSales) * 100}%`, minHeight: '20px' }}
                            >
                              <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                ₹{data.sales.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          {/* Profit Bar */}
                          <div className="relative">
                            <div 
                              className="w-6 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                              style={{ height: `${(data.profit / highestProfit) * 100}%`, minHeight: '20px' }}
                            >
                              <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                ₹{data.profit.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 mt-2 font-medium">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Scale */}
                  <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                    <span>₹0</span>
                    <span>₹{(highestSales/2).toLocaleString()}</span>
                    <span>₹{highestSales.toLocaleString()}</span>
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{monthlySalesData[monthlySalesData.length - 1].sales.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Current Month Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{monthlySalesData[monthlySalesData.length - 1].profit.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Current Month Profit</p>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="mt-4 flex justify-center">
                  <div className={`flex items-center px-4 py-2 rounded-full ${
                    monthlySalesData[monthlySalesData.length - 1].sales > monthlySalesData[monthlySalesData.length - 2].sales 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="font-medium">
                      {monthlySalesData[monthlySalesData.length - 1].sales > monthlySalesData[monthlySalesData.length - 2].sales ? '📈' : '📉'}
                      {' '}
                      {Math.abs(
                        ((monthlySalesData[monthlySalesData.length - 1].sales - monthlySalesData[monthlySalesData.length - 2].sales) / 
                         monthlySalesData[monthlySalesData.length - 2].sales * 100).toFixed(1)
                      )}% from last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Best Selling Products</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All →
                  </button>
                </div>
                
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl mr-4">
                          {product.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{product.revenue.toLocaleString()}</p>
                        <p className={`text-sm font-medium ${product.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-center p-4 rounded-lg border-l-4 ${
                    activity.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                    activity.color === 'green' ? 'bg-green-50 border-green-400' :
                    activity.color === 'purple' ? 'bg-purple-50 border-purple-400' :
                    'bg-yellow-50 border-yellow-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      activity.color === 'green' ? 'bg-green-100 text-green-600' :
                      activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'order' && '✓'}
                      {activity.type === 'stock' && '+'}
                      {activity.type === 'target' && '₹'}
                      {activity.type === 'review' && '⭐'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.message}</p>
                      <p className="text-sm text-gray-600">
                        {activity.time}
                        {activity.amount && ` • ${activity.amount}`}
                        {activity.by && ` • by ${activity.by}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <div className="w-64 bg-blue-800 text-white p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-blue-200 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'inventory', label: 'Inventory', icon: '📦' },
                { id: 'reports', label: 'Sales Reports', icon: '📈' },
                { id: 'invoices', label: 'Invoices', icon: '🧾' },
                { id: 'managers', label: 'Manager Control', icon: '👥' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                      activeTab === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        <Header />
        
        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="fixed top-20 left-4 bg-blue-600 text-white p-2 rounded-lg z-10 hover:bg-blue-700 transition-colors"
          >
            ☰
          </button>
        )}

        <div className="p-6">
          {/* Back to Dashboard Button */}
          {activeTab !== 'dashboard' && (
            <div className="mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
          
          {/* Dashboard Header */}
          {activeTab === 'dashboard' && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Store Dashboard</h2>
              <p className="text-gray-600">Welcome back! Here's your store performance overview.</p>
            </div>
          )}

          {/* Page Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;