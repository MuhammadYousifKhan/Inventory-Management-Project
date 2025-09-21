import React, { useState } from 'react';

const Billing = () => {
  const [bills, setBills] = useState([
    { id: 'BIL-1005', orderId: 'ORD1005', customer: 'Ali Ahmed', amount: 8500, date: '2025-09-20', status: 'paid', type: 'retail' },
    { id: 'BIL-1004', orderId: 'ORD1004', customer: 'Usman Khan', amount: 85000, date: '2025-09-19', status: 'pending', type: 'wholesale' },
    { id: 'BIL-1003', orderId: 'ORD1003', customer: 'Fatima Begum', amount: 19000, date: '2025-09-18', status: 'paid', type: 'retail' }
  ]);

  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [newBill, setNewBill] = useState({
    orderId: '',
    customer: '',
    amount: '',
    type: 'retail'
  });

  // Sample orders data - in real app, this would come from props or API
  const orders = [
    { id: 'ORD1005', customer: 'Ali Ahmed', amount: 8500, status: 'completed', type: 'retail' },
    { id: 'ORD1004', customer: 'Usman Khan', amount: 85000, status: 'processing', type: 'wholesale' },
    { id: 'ORD1006', customer: 'Bike Corner Shop', amount: 170000, status: 'completed', type: 'wholesale' }
  ];

  const generateBill = (e) => {
    e.preventDefault();
    const selectedOrder = orders.find(order => order.id === newBill.orderId);
    
    if (selectedOrder) {
      const newBillWithId = {
        ...newBill,
        id: `BIL-${String(bills.length + 1001).padStart(4, '0')}`,
        amount: parseInt(newBill.amount),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        type: selectedOrder.type
      };
      
      setBills([...bills, newBillWithId]);
      setNewBill({ orderId: '', customer: '', amount: '', type: 'retail' });
      setShowGenerateForm(false);
      alert(`Bill ${newBillWithId.id} generated successfully!`);
    }
  };

  const handleOrderSelect = (orderId) => {
    const selectedOrder = orders.find(order => order.id === orderId);
    if (selectedOrder) {
      setNewBill({
        orderId: selectedOrder.id,
        customer: selectedOrder.customer,
        amount: selectedOrder.amount,
        type: selectedOrder.type
      });
    }
  };

  const sendWhatsApp = (billId, customer) => {
    alert(`Bill ${billId} sent to ${customer} via WhatsApp.`);
    // Update bill status to indicate WhatsApp sent
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'paid' } : bill
    ));
  };

  const markAsPaid = (billId) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'paid' } : bill
    ));
    alert(`Bill ${billId} marked as paid.`);
  };

  const downloadPDF = (billId) => {
    alert(`Downloading PDF for Bill ${billId}`);
    // In real implementation, this would generate and download PDF
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type) => {
    return type === 'wholesale' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Billing System</h2>
        <button 
          onClick={() => setShowGenerateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Generate Bill
        </button>
      </div>

      {/* Generate Bill Form */}
      {showGenerateForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Generate New Bill</h3>
          <form onSubmit={generateBill} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Order</label>
              <select
                value={newBill.orderId}
                onChange={(e) => handleOrderSelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Order</option>
                {orders
                  .filter(order => order.status === 'completed')
                  .map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.customer} (₹{order.amount.toLocaleString()})
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
              <input
                type="text"
                value={newBill.customer}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                value={newBill.amount}
                onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bill Type</label>
              <input
                type="text"
                value={newBill.type}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-3">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Generate Bill
              </button>
              <button 
                type="button" 
                onClick={() => setShowGenerateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Bills</div>
          <div className="text-2xl font-bold text-gray-800">{bills.length}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-blue-600">
            ₹{bills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Pending Payments</div>
          <div className="text-2xl font-bold text-yellow-600">
            ₹{bills.filter(b => b.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Wholesale Bills</div>
          <div className="text-2xl font-bold text-purple-600">
            {bills.filter(b => b.type === 'wholesale').length}
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-blue-600">{bill.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{bill.orderId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{bill.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(bill.type)}`}>
                      {bill.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">₹{bill.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{bill.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => downloadPDF(bill.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm text-left"
                      >
                        Download PDF
                      </button>
                      <button 
                        onClick={() => sendWhatsApp(bill.id, bill.customer)}
                        className="text-green-600 hover:text-green-800 text-sm text-left"
                      >
                        Send WhatsApp
                      </button>
                      {bill.status === 'pending' && (
                        <button 
                          onClick={() => markAsPaid(bill.id)}
                          className="text-gray-600 hover:text-gray-800 text-sm text-left"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Download All Bills
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Export to Excel
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Print Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;