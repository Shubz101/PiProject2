'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page2() {
  const [paymentMethod, setPaymentMethod] = useState('Binance')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleNextClick = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/update-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod }),
      })

      if (response.ok) {
        console.log('Payment method saved successfully')
        // Navigate to the appropriate page based on the payment method
        if (paymentMethod === 'Binance') {
          router.push('/pageb')
        } else {
          router.push('/pageu')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to save payment method')
      }
    } catch (error) {
      console.error('Error saving payment method:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
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
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Next'}
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-center mt-4">
          {error}
        </div>
      )}

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
