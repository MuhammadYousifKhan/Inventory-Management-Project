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
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-xl`}>
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

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="group cursor-pointer" onClick={() => setActiveTab('inventory')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-3">
                      📦
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Inventory Management</h4>
                    <p className="text-sm text-gray-600">Manage batteries, bikes, and rikshaws</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('reports')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-green-200">
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-lg mb-3">
                      📊
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Sales Reports</h4>
                    <p className="text-sm text-gray-600">View daily, weekly, monthly reports</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('invoices')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-purple-200">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-lg mb-3">
                      🧾
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Invoice System</h4>
                    <p className="text-sm text-gray-600">Create and manage invoices</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer" onClick={() => setActiveTab('managers')}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 transition duration-200 group-hover:shadow-md group-hover:border-orange-200">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-lg mb-3">
                      👥
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Manager Control</h4>
                    <p className="text-sm text-gray-600">Manage manager accounts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New order #ORD1005 received</p>
                    <p className="text-sm text-gray-600">2 hours ago • ₹8,500</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">+</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New stock added - 12 Batteries</p>
                    <p className="text-sm text-gray-600">5 hours ago • by Manager Ali</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">$</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Monthly sales target achieved</p>
                    <p className="text-sm text-gray-600">1 day ago • ₹1,24,856</p>
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
        <div className="w-64 bg-blue-800 text-white p-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-blue-200 hover:text-white">
              ✕
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 flex items-center space-x-3 ${
                    activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'
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
                    activeTab === 'inventory' ? 'bg-blue-700' : 'hover:bg-blue-700'
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
                    activeTab === 'reports' ? 'bg-blue-700' : 'hover:bg-blue-700'
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
                    activeTab === 'invoices' ? 'bg-blue-700' : 'hover:bg-blue-700'
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
                    activeTab === 'managers' ? 'bg-blue-700' : 'hover:bg-blue-700'
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
            className="fixed top-20 left-4 bg-blue-600 text-white p-2 rounded-lg z-10"
          >
            ☰
          </button>
        )}

        <div className="p-6">
          {activeTab !== 'dashboard' && (
            <div className="mb-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center text-blue-600 hover:text-blue-800"
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