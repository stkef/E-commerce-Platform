import React, { useState } from 'react';
import { CartItem } from '../types'; // make sure the path is correct

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // replace with your Razorpay key
        amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100, // total in paise
        currency: 'INR',
        name: 'Your Shop',
        description: 'Checkout Payment',
        handler: function (response: any) {
          alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Customer Name',
          email: 'email@example.com',
          contact: '9999999999'
        },
        notes: {
          address: `${address}, ${city}, ${pincode}`
        },
        theme: {
          color: '#3399cc'
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      alert('Stripe integration coming soon!');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="font-bold border-t pt-2 mt-2">
          Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </div>
      </div>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="razorpay">Pay with Razorpay</option>
        <option value="stripe">Pay with Stripe</option>
      </select>
      <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
