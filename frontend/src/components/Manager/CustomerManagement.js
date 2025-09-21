import React, { useState } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ali Ahmed', phone: '+92 300 1234567', email: 'ali.ahmed@email.com', type: 'Battery', orders: 3 },
    { id: 2, name: 'Usman Khan', phone: '+92 301 7654321', email: 'usman.khan@email.com', type: 'Bike', orders: 1 },
    { id: 3, name: 'Fatima Begum', phone: '+92 302 9876543', email: 'fatima@email.com', type: 'Battery', orders: 5 }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [customerType, setCustomerType] = useState('battery');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    nic: '',
    chassis: '',
    model: ''
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const customerData = {
      id: customers.length + 1,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      type: customerType === 'battery' ? 'Battery' : 'Bike',
      orders: 0
    };

    if (customerType === 'bike') {
      customerData.nic = newCustomer.nic;
      customerData.chassis = newCustomer.chassis;
      customerData.model = newCustomer.model;
    }

    setCustomers([...customers, customerData]);
    setNewCustomer({ name: '', phone: '', email: '', nic: '', chassis: '', model: '' });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Add Customer
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Customer</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="battery"
                  checked={customerType === 'battery'}
                  onChange={() => setCustomerType('battery')}
                  className="mr-2"
                />
                Battery Customer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="bike"
                  checked={customerType === 'bike'}
                  onChange={() => setCustomerType('bike')}
                  className="mr-2"
                />
                Bike Wholesale
              </label>
            </div>
          </div>

          <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {customerType === 'bike' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
                  <input
                    type="text"
                    value={newCustomer.nic}
                    onChange={(e) => setNewCustomer({...newCustomer, nic: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                  <input
                    type="text"
                    value={newCustomer.chassis}
                    onChange={(e) => setNewCustomer({...newCustomer, chassis: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Details</label>
                  <input
                    type="text"
                    value={newCustomer.model}
                    onChange={(e) => setNewCustomer({...newCustomer, model: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="md:col-span-2 flex space-x-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Add Customer
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    {customer.nic && <div className="text-xs text-gray-500">NIC: {customer.nic}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{customer.phone}</div>
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.type === 'Battery' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Edit
                      </button>
                    </div>
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

export default CustomerManagement;