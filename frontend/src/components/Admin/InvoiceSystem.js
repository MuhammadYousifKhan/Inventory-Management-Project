import React, { useState, useEffect } from 'react';

const InvoiceSystem = () => {
  const [invoices, setInvoices] = useState([
    { 
      id: 'INV-001', 
      date: '2025-09-15', 
      dueDate: '2025-10-15',
      supplier: 'Exide Pakistan', 
      amount: 425000, 
      tax: 63750,
      total: 488750,
      status: 'paid',
      items: [
        { name: 'Exide Battery 60Ah', quantity: 50, price: 8500, total: 425000 }
      ]
    },
    { 
      id: 'INV-002', 
      date: '2025-09-10', 
      dueDate: '2025-10-10',
      supplier: 'Yamaha Motors', 
      amount: 2550000, 
      tax: 382500,
      total: 2932500,
      status: 'pending',
      items: [
        { name: 'Yamaha 70cc Bike', quantity: 30, price: 85000, total: 2550000 }
      ]
    },
    { 
      id: 'INV-003', 
      date: '2025-09-05', 
      dueDate: '2025-10-05',
      supplier: 'Sazgar Engineering', 
      amount: 1480000, 
      tax: 222000,
      total: 1702000,
      status: 'paid',
      items: [
        { name: 'Loader Rikshaw', quantity: 8, price: 185000, total: 1480000 }
      ]
    },
    { 
      id: 'INV-004', 
      date: '2025-08-28', 
      dueDate: '2025-09-28',
      supplier: 'Amaron Batteries', 
      amount: 209000, 
      tax: 31350,
      total: 240350,
      status: 'overdue',
      items: [
        { name: 'Amaron Battery 75Ah', quantity: 22, price: 9500, total: 209000 }
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [newInvoice, setNewInvoice] = useState({
    supplier: '',
    amount: '',
    tax: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    items: [{ name: '', quantity: 1, price: 0, total: 0 }]
  });
  const [editMode, setEditMode] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Sort invoices
  useEffect(() => {
    let sortedInvoices = [...invoices];
    if (sortConfig.key) {
      sortedInvoices.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setInvoices(sortedInvoices);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter invoices based on status and search term
  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate totals
  const totals = {
    all: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.total, 0),
    overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0)
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const amount = parseInt(newInvoice.amount);
    const tax = parseInt(newInvoice.tax) || Math.round(amount * 0.15);
    const total = amount + tax;
    
    const newInvoiceWithId = {
      ...newInvoice,
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      amount,
      tax,
      total,
      items: newInvoice.items.map(item => ({
        ...item,
        total: item.quantity * item.price
      }))
    };
    
    setInvoices([...invoices, newInvoiceWithId]);
    setNewInvoice({
      supplier: '',
      amount: '',
      tax: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      items: [{ name: '', quantity: 1, price: 0, total: 0 }]
    });
    setShowCreateForm(false);
    showNotification('Invoice created successfully!');
  };

  const handleEditInvoice = (e) => {
    e.preventDefault();
    const amount = parseInt(editingInvoice.amount);
    const tax = parseInt(editingInvoice.tax);
    const total = amount + tax;
    
    const updatedInvoice = {
      ...editingInvoice,
      amount,
      tax,
      total,
      items: editingInvoice.items.map(item => ({
        ...item,
        total: item.quantity * item.price
      }))
    };
    
    setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
    setEditMode(false);
    setEditingInvoice(null);
    showNotification('Invoice updated successfully!');
  };

  const handleAddItem = (isEdit = false) => {
    if (isEdit) {
      setEditingInvoice({
        ...editingInvoice,
        items: [...editingInvoice.items, { name: '', quantity: 1, price: 0, total: 0 }]
      });
    } else {
      setNewInvoice({
        ...newInvoice,
        items: [...newInvoice.items, { name: '', quantity: 1, price: 0, total: 0 }]
      });
    }
  };

  const handleRemoveItem = (index, isEdit = false) => {
    if (isEdit) {
      const newItems = editingInvoice.items.filter((_, i) => i !== index);
      setEditingInvoice({
        ...editingInvoice,
        items: newItems
      });
    } else {
      const newItems = newInvoice.items.filter((_, i) => i !== index);
      setNewInvoice({
        ...newInvoice,
        items: newItems
      });
    }
  };

  const handleItemChange = (index, field, value, isEdit = false) => {
    if (isEdit) {
      const newItems = [...editingInvoice.items];
      newItems[index] = {
        ...newItems[index],
        [field]: field === 'quantity' || field === 'price' ? parseInt(value) || 0 : value
      };
      
      // Calculate total for this item
      if (field === 'quantity' || field === 'price') {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }
      
      setEditingInvoice({
        ...editingInvoice,
        items: newItems,
        amount: newItems.reduce((sum, item) => sum + item.total, 0)
      });
    } else {
      const newItems = [...newInvoice.items];
      newItems[index] = {
        ...newItems[index],
        [field]: field === 'quantity' || field === 'price' ? parseInt(value) || 0 : value
      };
      
      // Calculate total for this item
      if (field === 'quantity' || field === 'price') {
        newItems[index].total = newItems[index].quantity * newItems[index].price;
      }
      
      setNewInvoice({
        ...newInvoice,
        items: newItems,
        amount: newItems.reduce((sum, item) => sum + item.total, 0)
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const markAsPaid = (id) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, status: 'paid' } : invoice
    ));
    setSelectedInvoice(null);
    showNotification('Invoice marked as paid!');
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    showNotification('Invoice deleted successfully!');
  };

  const downloadPDF = (invoice) => {
    showNotification(`Downloading PDF for ${invoice.id}`, 'info');
    // In a real app, this would generate or download a PDF
  };

  const startEditInvoice = (invoice) => {
    setEditingInvoice({...invoice});
    setEditMode(true);
  };

  const handleExport = (type) => {
    showNotification(`Exporting data as ${type}`, 'info');
    // In a real app, this would export data
  };

  const handlePrint = () => {
    showNotification('Preparing print summary', 'info');
    // In a real app, this would print the summary
  };

  const handleEmail = () => {
    showNotification('Sending email reports', 'info');
    // In a real app, this would send emails
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
            {notification.message}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Invoice Management System</h2>
            <p className="text-gray-600 mt-1">Manage supplier invoices and payments</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md transition-colors"
          >
            <span>+</span>
            <span>Create New Invoice</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Invoices</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by supplier or invoice ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                📄
              </div>
              <span className="text-sm font-medium text-blue-600">+{invoices.length}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-800">{invoices.length}</p>
              <p className="text-xs text-gray-500 mt-1">₹{totals.all.toLocaleString()} total value</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                ✓
              </div>
              <span className="text-sm font-medium text-green-600">
                {invoices.filter(inv => inv.status === 'paid').length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-green-600">
                {invoices.filter(inv => inv.status === 'paid').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">₹{totals.paid.toLocaleString()} paid</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
                ⏱️
              </div>
              <span className="text-sm font-medium text-yellow-600">
                {invoices.filter(inv => inv.status === 'pending').length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {invoices.filter(inv => inv.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">₹{totals.pending.toLocaleString()} pending</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl">
                ⚠️
              </div>
              <span className="text-sm font-medium text-red-600">
                {invoices.filter(inv => inv.status === 'overdue').length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {invoices.filter(inv => inv.status === 'overdue').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">₹{totals.overdue.toLocaleString()} overdue</p>
            </div>
          </div>
        </div>

        {/* Create Invoice Form */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Create New Invoice</h3>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateInvoice} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name *</label>
                    <input
                      type="text"
                      value={newInvoice.supplier}
                      onChange={(e) => setNewInvoice({...newInvoice, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                      placeholder="Enter supplier name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date *</label>
                    <input
                      type="date"
                      value={newInvoice.date}
                      onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                    <input
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={newInvoice.status}
                      onChange={(e) => setNewInvoice({...newInvoice, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-800">Invoice Items</h4>
                    <button 
                      type="button"
                      onClick={() => handleAddItem(false)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <span>+</span>
                      <span>Add Item</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                        <div className="md:col-span-5">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value, false)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            placeholder="Item description"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value, false)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            min="1"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value, false)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            min="0"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Total (₹)</label>
                          <input
                            type="text"
                            value={item.total.toLocaleString()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                            readOnly
                          />
                        </div>
                        
                        <div className="md:col-span-1">
                          {newInvoice.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index, false)}
                              className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 shadow-sm"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax (₹)</label>
                      <input
                        type="number"
                        value={newInvoice.tax}
                        onChange={(e) => setNewInvoice({...newInvoice, tax: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter tax amount"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                        <span className="text-sm font-medium text-gray-800">₹{newInvoice.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Tax:</span>
                        <span className="text-sm font-medium text-gray-800">
                          ₹{newInvoice.tax ? parseInt(newInvoice.tax).toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-md font-bold text-gray-800">Total:</span>
                        <span className="text-md font-bold text-gray-800">
                          ₹{(parseInt(newInvoice.amount) + parseInt(newInvoice.tax || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md">
                    Create Invoice
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Invoice Form */}
        {editMode && editingInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Invoice - {editingInvoice.id}</h3>
                <button 
                  onClick={() => {
                    setEditMode(false);
                    setEditingInvoice(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditInvoice} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name *</label>
                    <input
                      type="text"
                      value={editingInvoice.supplier}
                      onChange={(e) => setEditingInvoice({...editingInvoice, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                      placeholder="Enter supplier name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date *</label>
                    <input
                      type="date"
                      value={editingInvoice.date}
                      onChange={(e) => setEditingInvoice({...editingInvoice, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                    <input
                      type="date"
                      value={editingInvoice.dueDate}
                      onChange={(e) => setEditingInvoice({...editingInvoice, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editingInvoice.status}
                      onChange={(e) => setEditingInvoice({...editingInvoice, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-800">Invoice Items</h4>
                    <button 
                      type="button"
                      onClick={() => handleAddItem(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <span>+</span>
                      <span>Add Item</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {editingInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                        <div className="md:col-span-5">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value, true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            placeholder="Item description"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value, true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            min="1"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value, true)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                            min="0"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Total (₹)</label>
                          <input
                            type="text"
                            value={item.total.toLocaleString()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                            readOnly
                          />
                        </div>
                        
                        <div className="md:col-span-1">
                          {editingInvoice.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index, true)}
                              className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 shadow-sm"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax (₹)</label>
                      <input
                        type="number"
                        value={editingInvoice.tax}
                        onChange={(e) => setEditingInvoice({...editingInvoice, tax: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter tax amount"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                        <span className="text-sm font-medium text-gray-800">₹{editingInvoice.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Tax:</span>
                        <span className="text-sm font-medium text-gray-800">
                          ₹{editingInvoice.tax ? parseInt(editingInvoice.tax).toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-md font-bold text-gray-800">Total:</span>
                        <span className="text-md font-bold text-gray-800">
                          ₹{(parseInt(editingInvoice.amount) + parseInt(editingInvoice.tax || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md">
                    Update Invoice
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditMode(false);
                      setEditingInvoice(null);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invoice List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('id')}
                  >
                    Invoice ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    Date/Due {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('supplier')}
                  >
                    Supplier {sortConfig.key === 'supplier' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('amount')}
                  >
                    Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => {
                  const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                  const isDueSoon = daysUntilDue <= 7 && daysUntilDue > 0;
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-blue-600">{invoice.id}</div>
                        <div className="text-xs text-gray-500">{invoice.items.length} items</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{invoice.date}</div>
                        <div className={`text-xs ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-500'}`}>
                          Due in {isOverdue ? `${Math.abs(daysUntilDue)} days ago` : `${daysUntilDue} days`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{invoice.supplier}</div>
                        <div className="text-xs text-gray-500">{invoice.items[0].name}{invoice.items.length > 1 ? ` +${invoice.items.length - 1} more` : ''}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">₹{invoice.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Total: ₹{invoice.total.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            title="View Details"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => downloadPDF(invoice)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium" 
                            title="Download PDF"
                          >
                            PDF
                          </button>
                          <button 
                            onClick={() => startEditInvoice(invoice)}
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                            title="Edit Invoice"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteInvoice(invoice.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium" 
                            title="Delete Invoice"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-lg">No invoices found matching your criteria</p>
              <p className="text-sm mt-2">Try adjusting your search or filter parameters</p>
            </div>
          )}
        </div>

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Invoice Details - {selectedInvoice.id}</h3>
                  <button 
                    onClick={() => setSelectedInvoice(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Supplier Information</h4>
                    <p className="text-gray-600">{selectedInvoice.supplier}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Invoice Dates</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-sm text-gray-600">Issue Date:</span>
                        <p className="text-sm font-medium">{selectedInvoice.date}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Due Date:</span>
                        <p className="text-sm font-medium">{selectedInvoice.dueDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Item</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Quantity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">₹{item.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-800">₹{item.total.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-600">Subtotal:</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">₹{selectedInvoice.amount.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-600">Tax:</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">₹{selectedInvoice.tax.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-800">Total:</td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-800">₹{selectedInvoice.total.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => downloadPDF(selectedInvoice)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm"
                  >
                    Download PDF
                  </button>
                  {selectedInvoice.status !== 'paid' && (
                    <button 
                      onClick={() => markAsPaid(selectedInvoice.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleExport('all')}
              className="flex flex-col items-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 shadow-sm"
            >
              <span className="text-lg mb-2">📥</span>
              <span className="text-sm font-medium">Download All</span>
            </button>
            
            <button 
              onClick={() => handleExport('excel')}
              className="flex flex-col items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
            >
              <span className="text-lg mb-2">📊</span>
              <span className="text-sm font-medium">Export Excel</span>
            </button>
            
            <button 
              onClick={handlePrint}
              className="flex flex-col items-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200 shadow-sm"
            >
              <span className="text-lg mb-2">🖨️</span>
              <span className="text-sm font-medium">Print Summary</span>
            </button>
            
            <button 
              onClick={handleEmail}
              className="flex flex-col items-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-200 shadow-sm"
            >
              <span className="text-lg mb-2">📧</span>
              <span className="text-sm font-medium">Email Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSystem;