'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page2() {
  const [paymentMethod, setPaymentMethod] = useState('Binance')
  const router = useRouter()

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleNextClick = () => {
    // Here you can handle the navigation based on the selected payment method
    // For now, we'll just log the selected method
    console.log('Selected payment method:', paymentMethod)
    
    // You can add navigation logic here, for example:
    // if (paymentMethod === 'Binance') {
    //   router.push('/pageb')
    // } else {
    //   router.push('/pageu')
    // }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-custom-purple text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Pi Trader</h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8 text-center">Select Your Payment Receiving Platform</h2>
        <div className="mb-6">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              id="binance"
              name="payment"
              className="form-radio h-6 w-6 text-gray-600"
              checked={paymentMethod === 'Binance'}
              onChange={() => handlePaymentMethodChange('Binance')}
            />
            <span className="text-2xl font-semibold">Binance</span>
          </label>
        </div>
        <div className="mb-8">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              id="upi"
              name="payment"
              className="form-radio h-6 w-6 text-gray-600"
              checked={paymentMethod === 'UPI'}
              onChange={() => handlePaymentMethodChange('UPI')}
            />
            <span className="text-2xl font-semibold">UPI</span>
          </label>
        </div>
        <p className="text-custom-purple font-semibold mb-12 text-2xl text-center">Choose Binance for Faster Payment Experiences</p>
      </div>
      <div className="flex justify-end items-end p-6">
        <button
          onClick={handleNextClick}
          className="bg-custom-purple text-white text-2xl font-bold py-3 px-12 rounded-full"
          style={{ transform: 'scale(1.3)' }}
        >
          Next
        </button>
      </div>

      <style jsx>{`
        .bg-custom-purple {
          background-color: #670773;
        }
        .text-custom-purple {
          color: #670773;
        }
      `}</style>
    </div>
  )
}
