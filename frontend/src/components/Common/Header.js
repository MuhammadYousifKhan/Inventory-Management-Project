import React from 'react';

const Header = () => {
  const userRole = localStorage.getItem('userRole');
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">🏪</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Aamir Battery System</h1>
          <p className="text-sm text-blue-100">Inventory Management System</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
          {userRole === 'admin' ? 'Administrator' : 'Shop Manager'}
        </span>
        <button 
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-200 flex items-center space-x-2"
        >
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;