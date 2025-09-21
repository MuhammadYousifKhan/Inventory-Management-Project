import React, { useState } from 'react';
import Header from '../Common/Header';
import CustomerManagement from './CustomerManagement';
import OrderManagement from './OrderManagement';
import Billing from './Billing';
import StockCheck from './StockCheck';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: "Today's Orders", value: '12', icon: '🛒', color: 'bg-blue-500', change: '+2' },
    { title: 'Pending Bills', value: '5', icon: '💰', color: 'bg-orange-500', change: '-1' },
    { title: 'New Customers', value: '3', icon: '👥', color: 'bg-green-500', change: '+3' },
    { title: 'Low Stock Items', value: '2', icon: '⚠️', color: 'bg-red-500', change: '+0' }
  ];

  const recentOrders = [
    { id: 'ORD1005', customer: 'Ali Ahmed', amount: '₹8,500', status: 'completed', time: '2 hours ago' },
    { id: 'ORD1004', customer: 'Usman Khan', amount: '₹12,300', status: 'processing', time: '4 hours ago' },
    { id: 'ORD1003', customer: 'Fatima Begum', amount: '₹5,800', status: 'completed', time: '6 hours ago' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomerManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'billing':
        return <Billing />;
      case 'stock':
        return <StockCheck />;
      default:
        return (
          <>
            {/* Welcome Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Manager Dashboard</h2>
              <p className="text-gray-600">Welcome back! Manage your shop operations efficiently.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="group cursor-pointer" onClick={() => setActiveTab('customers')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-3">
                      👥
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Customer Management</h4>
                    <p className="text-sm text-gray-600">Add and manage customers</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('orders')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-green-200">
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-lg mb-3">
                      🛒
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Order Management</h4>
                    <p className="text-sm text-gray-600">Place and track orders</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('billing')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-purple-200">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-lg mb-3">
                      🧾
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Billing</h4>
                    <p className="text-sm text-gray-600">Generate bills and invoices</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('stock')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-orange-200">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-lg mb-3">
                      📦
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Stock Check</h4>
                    <p className="text-sm text-gray-600">Check inventory levels</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="py-3 text-sm text-gray-800">{order.customer}</td>
                        <td className="py-3 text-sm text-gray-600">{order.amount}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        <div className="w-64 bg-green-800 text-white p-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Manager Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-green-200 hover:text-white">
              ✕
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'dashboard' ? 'bg-green-700' : 'hover:bg-green-700'
                  }`}
                >
                  <span className="text-lg">📊</span>
                  <span>Dashboard</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'customers' ? 'bg-green-700' : 'hover:bg-green-700'
                  }`}
                >
                  <span className="text-lg">👥</span>
                  <span>Customers</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'orders' ? 'bg-green-700' : 'hover:bg-green-700'
                  }`}
                >
                  <span className="text-lg">🛒</span>
                  <span>Orders</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'billing' ? 'bg-green-700' : 'hover:bg-green-700'
                  }`}
                >
                  <span className="text-lg">🧾</span>
                  <span>Billing</span>
                </button>
              </li>
              
              <li>
                <button
                  onClick={() => setActiveTab('stock')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'stock' ? 'bg-green-700' : 'hover:bg-green-700'
                  }`}
                >
                  <span className="text-lg">📦</span>
                  <span>Stock Check</span>
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
            className="fixed top-20 left-4 bg-green-600 text-white p-2 rounded-lg z-10"
          >
            ☰
          </button>
        )}

        <div className="p-6">
          {activeTab !== 'dashboard' && (
            <div className="mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;