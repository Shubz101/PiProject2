import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  placeholder: string;
  displayText?: string;
}

const PaymentMethods = () => {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '/api/placeholder/40/40',
      placeholder: 'Enter PayPal address'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      logo: '/api/placeholder/40/40',
      placeholder: 'Enter Google Pay address'
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      logo: '/api/placeholder/40/40',
      placeholder: 'Enter Apple Pay address'
    },
    {
      id: 'mastercard',
      name: '•••• 2766',
      logo: '/api/placeholder/40/40',
      placeholder: 'Enter Mastercard details'
    }
  ];

  const toggleMethod = (methodId: string) => {
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <ArrowLeft className="text-xl" />
          <h1 className="text-xl font-semibold ml-4">Payment Methods</h1>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <React.Fragment key={method.id}>
              <div 
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => toggleMethod(method.id)}
              >
                <div className="flex items-center">
                  <img 
                    src={method.logo} 
                    alt={`${method.name} logo`}
                    className="w-10 h-10"
                    width={40}
                    height={40}
                  />
                  <span className="ml-4 text-lg">
                    {method.displayText || method.name}
                  </span>
                </div>
                <span className="text-purple-600">Connected</span>
              </div>
              
              {expandedMethod === method.id && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <input
                    type="text"
                    placeholder={method.placeholder}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-8">
          <button className="w-full py-4 bg-purple-100 text-purple-600 rounded-lg">
            Add New Card
          </button>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <button className="w-1/2 py-4 bg-purple-100 text-purple-600 rounded-lg mr-2">
          Cancel
        </button>
        <button className="w-1/2 py-4 bg-purple-600 text-white rounded-lg ml-2">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
