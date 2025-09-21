import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { 
      id: 'ORD1005', 
      customer: 'Ali Ahmed', 
      type: 'retail', 
      productType: 'Battery', 
      product: 'Exide Battery 60Ah', 
      quantity: 1, 
      price: 8500, 
      status: 'completed',
      gatePass: true,
      billSent: true
    },
    { 
      id: 'ORD1004', 
      customer: 'Usman Khan', 
      type: 'wholesale', 
      productType: 'Bike', 
      product: 'Yamaha 70cc Bike', 
      quantity: 1, 
      price: 85000, 
      status: 'processing',
      gatePass: false,
      billSent: false
    },
    { 
      id: 'ORD1003', 
      customer: 'Fatima Begum', 
      type: 'retail', 
      productType: 'Battery', 
      product: 'Amaron Battery 75Ah', 
      quantity: 2, 
      price: 19000, 
      status: 'completed',
      gatePass: true,
      billSent: true
    }
  ]);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderType, setOrderType] = useState('retail');
  const [newOrder, setNewOrder] = useState({
    customer: '',
    productType: 'Battery',
    product: '',
    quantity: 1,
    price: '',
    nic: '',
    chassis: '',
    model: ''
  });

  const products = {
    Battery: [
      { id: 1, name: 'Exide Battery 60Ah', price: 8500, stock: 45 },
      { id: 2, name: 'Amaron Battery 75Ah', price: 9500, stock: 22 },
      { id: 3, name: 'Solar Battery 100Ah', price: 12500, stock: 5 }
    ],
    Bike: [
      { id: 4, name: 'Yamaha 70cc Bike', price: 85000, stock: 12 },
      { id: 5, name: 'Honda 70cc Bike', price: 82000, stock: 8 }
    ],
    Rikshaw: [
      { id: 6, name: 'Loader Rikshaw', price: 185000, stock: 8 },
      { id: 7, name: 'Passenger Rikshaw', price: 165000, stock: 6 }
    ]
  };

  const customers = [
    { id: 1, name: 'Ali Ahmed', type: 'retail' },
    { id: 2, name: 'Usman Khan', type: 'wholesale' },
    { id: 3, name: 'Fatima Begum', type: 'retail' },
    { id: 4, name: 'Bike Corner Shop', type: 'wholesale' }
  ];

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const newOrderWithId = {
      ...newOrder,
      id: `ORD${1000 + orders.length + 1}`,
      type: orderType,
      status: 'processing',
      price: parseInt(newOrder.price),
      gatePass: false,
      billSent: false,
      nic: orderType === 'wholesale' ? newOrder.nic : undefined,
      chassis: orderType === 'wholesale' ? newOrder.chassis : undefined,
      model: orderType === 'wholesale' ? newOrder.model : undefined
    };
    setOrders([...orders, newOrderWithId]);
    setNewOrder({ 
      customer: '', 
      productType: 'Battery', 
      product: '', 
      quantity: 1, 
      price: '', 
      nic: '', 
      chassis: '', 
      model: '' 
    });
    setShowOrderForm(false);
  };

  const handleProductTypeChange = (productType) => {
    setNewOrder({
      ...newOrder,
      productType,
      product: '',
      price: ''
    });
  };

  const handleProductChange = (productName) => {
    const selectedProduct = products[newOrder.productType].find(p => p.name === productName);
    if (selectedProduct) {
      setNewOrder({
        ...newOrder,
        product: productName,
        price: selectedProduct.price
      });
    }
  };

  const generateGatePass = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, gatePass: true } : order
    ));
    alert(`Gate Pass generated for Order ${orderId}. Sent via WhatsApp.`);
    // In real implementation, this would generate PDF and send via WhatsApp API
  };

  const completeOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'completed', billSent: true } : order
    ));
    alert(`Order ${orderId} completed. Bill sent via WhatsApp.`);
  };

  const getOrderTypeBadge = (type) => {
    return type === 'wholesale' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getProductTypeBadge = (type) => {
    switch (type) {
      case 'Battery': return 'bg-orange-100 text-orange-800';
      case 'Bike': return 'bg-green-100 text-green-800';
      case 'Rikshaw': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <button 
          onClick={() => setShowOrderForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + New Order
        </button>
      </div>

      {showOrderForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Order</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="retail"
                  checked={orderType === 'retail'}
                  onChange={() => setOrderType('retail')}
                  className="mr-2"
                />
                Retail Order
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="wholesale"
                  checked={orderType === 'wholesale'}
                  onChange={() => setOrderType('wholesale')}
                  className="mr-2"
                />
                Wholesale Order
              </label>
            </div>
          </div>

          <form onSubmit={handleCreateOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
              <select
                value={newOrder.customer}
                onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Customer</option>
                {customers
                  .filter(customer => customer.type === orderType)
                  .map(customer => (
                    <option key={customer.id} value={customer.name}>{customer.name}</option>
                  ))
                }
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
              <select
                value={newOrder.productType}
                onChange={(e) => handleProductTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="Battery">Battery</option>
                <option value="Bike">70cc Bike</option>
                <option value="Rikshaw">Loader Rikshaw</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                value={newOrder.product}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Product</option>
                {products[newOrder.productType].map(product => (
                  <option key={product.id} value={product.name}>
                    {product.name} (₹{product.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                value={newOrder.price}
                onChange={(e) => setNewOrder({...newOrder, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {orderType === 'wholesale' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
                  <input
                    type="text"
                    value={newOrder.nic}
                    onChange={(e) => setNewOrder({...newOrder, nic: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                  <input
                    type="text"
                    value={newOrder.chassis}
                    onChange={(e) => setNewOrder({...newOrder, chassis: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Details</label>
                  <input
                    type="text"
                    value={newOrder.model}
                    onChange={(e) => setNewOrder({...newOrder, model: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="md:col-span-2 flex space-x-3">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Create Order
              </button>
              <button 
                type="button" 
                onClick={() => setShowOrderForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Orders</div>
          <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Processing</div>
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter(order => order.status === 'processing').length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {orders.filter(order => order.status === 'completed').length}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm font-medium text-gray-600 mb-2">Wholesale Orders</div>
          <div className="text-2xl font-bold text-purple-600">
            {orders.filter(order => order.type === 'wholesale').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-blue-600">{order.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                    {order.nic && <div className="text-xs text-gray-500">NIC: {order.nic}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getOrderTypeBadge(order.type)}`}>
                        {order.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getProductTypeBadge(order.productType)}`}>
                        {order.productType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.product}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                    {order.chassis && <div className="text-xs text-gray-500">Chassis: {order.chassis}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">₹{(order.price * order.quantity).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <div className="mt-1 text-xs text-gray-500">
                      {order.gatePass && '✓ Gate Pass'}
                      {order.billSent && ' ✓ Bill Sent'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      {order.status === 'processing' && (
                        <>
                          {!order.gatePass && (
                            <button 
                              onClick={() => generateGatePass(order.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm text-left"
                            >
                              Generate Gate Pass
                            </button>
                          )}
                          <button 
                            onClick={() => completeOrder(order.id)}
                            className="text-green-600 hover:text-green-800 text-sm text-left"
                          >
                            Complete Order
                          </button>
                        </>
                      )}
                      {order.status === 'completed' && (
                        <button className="text-gray-600 hover:text-gray-800 text-sm text-left">
                          View Bill
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
    </div>
  );
};

export default OrderManagement;