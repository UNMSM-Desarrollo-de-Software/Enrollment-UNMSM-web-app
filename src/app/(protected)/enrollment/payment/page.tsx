'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

export default function PaymentPage() {
  const router = useRouter()
  const { getTotalAmount, completePayment, setStep } = useEnrollmentStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    completePayment()
    setStep('confirmation')
    router.push('/enrollment/confirmation')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Complete Payment
          </h2>

          <div className="mb-8">
            <p className="text-lg font-medium mb-4">
              Amount to Pay: S/. {getTotalAmount().toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Please note: This is a simulated payment page. In a real application,
              this would integrate with a payment gateway.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-4">Payment Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                setStep('terms')
                router.push('/enrollment/terms')
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
