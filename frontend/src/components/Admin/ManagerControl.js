import React, { useState } from 'react';

const ManagerControl = () => {
  const [managers, setManagers] = useState([
    { id: 1, name: 'Ali Ahmed', email: 'ali@aamirautos.com', phone: '+92 300 1234567', status: 'active' },
    { id: 2, name: 'Usman Khan', email: 'usman@aamirautos.com', phone: '+92 301 7654321', status: 'active' },
    { id: 3, name: 'Fatima Siddiqui', email: 'fatima@aamirautos.com', phone: '+92 302 9876543', status: 'inactive' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleAddManager = (e) => {
    e.preventDefault();
    const newManagerWithId = {
      ...newManager,
      id: managers.length + 1,
      status: 'active'
    };
    setManagers([...managers, newManagerWithId]);
    setNewManager({ name: '', email: '', phone: '', password: '' });
    setShowAddForm(false);
  };

  const toggleManagerStatus = (id) => {
    setManagers(managers.map(manager => 
      manager.id === id 
        ? { ...manager, status: manager.status === 'active' ? 'inactive' : 'active' }
        : manager
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manager Accounts</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Manager
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Manager</h3>
          <form onSubmit={handleAddManager} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newManager.name}
                onChange={(e) => setNewManager({...newManager, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newManager.email}
                onChange={(e) => setNewManager({...newManager, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={newManager.phone}
                onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={newManager.password}
                onChange={(e) => setNewManager({...newManager, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Create Account
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {managers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{manager.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{manager.email}</div>
                    <div className="text-sm text-gray-600">{manager.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      manager.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {manager.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleManagerStatus(manager.id)}
                      className={`px-3 py-1 text-sm rounded ${
                        manager.status === 'active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {manager.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerControl;