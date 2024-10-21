'use client'

import React, { useState } from 'react';

const PaymentMethods: React.FC = () => {
  const [visibleInput, setVisibleInput] = useState<string | null>(null);

  const toggleBox = (boxId: string) => {
    setVisibleInput(visibleInput === boxId ? null : boxId);
  };

  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <i className="fas fa-arrow-left text-xl"></i>
          <h1 className="text-xl font-semibold ml-4">Payment Methods</h1>
        </div>
        <div className="space-y-4">
          {['paypal', 'googlepay', 'applepay', 'mastercard'].map(method => (
            <div key={method}>
              <div
                id={`${method}-box`}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => toggleBox(`${method}-input`)}
              >
                <div className="flex items-center">
                  <img
                    alt={`${method} logo`}
                    className="w-10 h-10"
                    src={`https://storage.googleapis.com/a1aa/image/${method}.jpg`} // Replace with actual image URLs
                  />
                  <span className="ml-4 text-lg">{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                </div>
                <span className="text-purple-600">Connected</span>
              </div>
              <div
                id={`${method}-input`}
                className={`hidden p-4 bg-gray-100 rounded-lg ${visibleInput === `${method}-input` ? '' : 'hidden'}`}
              >
                <input
                  type="text"
                  placeholder={`Enter ${method.charAt(0).toUpperCase() + method.slice(1)} address`}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button className="w-full py-4 bg-purple-100 text-purple-600 rounded-lg">Add New Card</button>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <button className="w-1/2 py-4 bg-purple-100 text-purple-600 rounded-lg mr-2">Cancel</button>
        <button className="w-1/2 py-4 bg-purple-600 text-white rounded-lg ml-2">Continue</button>
      </div>
    </div>
  );
};

export default PaymentMethods;
