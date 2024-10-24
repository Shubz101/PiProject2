'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PaymentMethod {
  id: string
  name: string
  image: string
  displayText: string
  isConnected: boolean
  placeholder: string
}

export default function PaymentMethods() {
  const [openInputId, setOpenInputId] = useState<string | null>(null)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'binance',
      name: 'Binance',
      image: 'https://example.com/binance-logo.jpg', // Replace with actual image URL
      displayText: 'Binance',
      isConnected: false,
      placeholder: 'Enter Binance address'
    },
    {
      id: 'kucoin',
      name: 'KuCoin',
      image: 'https://example.com/kucoin-logo.jpg', // Replace with actual image URL
      displayText: 'KuCoin',
      isConnected: false,
      placeholder: 'Enter KuCoin address'
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      image: 'https://example.com/trustwallet-logo.jpg', // Replace with actual image URL
      displayText: 'Trust Wallet',
      isConnected: false,
      placeholder: 'Enter Trust Wallet address'
    },
    {
      id: 'upi',
      name: 'UPI',
      image: 'https://example.com/upi-logo.jpg', // Replace with actual image URL
      displayText: 'UPI',
      isConnected: false,
      placeholder: 'Enter UPI address'
    }
]

  const toggleInput = (id: string) => {
    setOpenInputId(openInputId === id ? null : id)
  }

  return (
    <div className="bg-white h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <i className="fas fa-arrow-left text-xl"></i>
          <h1 className="text-xl font-semibold ml-4">Payment Methods</h1>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              <div 
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => toggleInput(method.id)}
              >
                <div className="flex items-center">
                  <Image
                    src={method.image}
                    alt={`${method.name} logo`}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="ml-4 text-lg">{method.displayText}</span>
                </div>
                <span className="text-purple-600">Connected</span>
              </div>
              
              {openInputId === method.id && (
                <div className="p-4 bg-gray-100 rounded-lg mt-2">
                  <input 
                    type="text" 
                    placeholder={method.placeholder}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button className="w-full py-4 bg-purple-100 text-purple-600 rounded-lg">
            Connect Payment Address
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
  )
}
