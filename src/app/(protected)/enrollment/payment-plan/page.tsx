'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

export default function PaymentPlanPage() {
  const router = useRouter()
  const { getTotalAmount, setPaymentPlan, setStep } = useEnrollmentStore()
  const totalAmount = getTotalAmount()
  
  const [selectedInstallments, setSelectedInstallments] = useState(1)

  const paymentOptions = [
    { installments: 1, description: 'Single payment' },
    { installments: 2, description: 'Two installments' },
    { installments: 4, description: 'Four installments' },
  ]

  const handleNext = () => {
    const amountPerInstallment = totalAmount / selectedInstallments
    setPaymentPlan({
      totalAmount,
      installments: selectedInstallments,
      amountPerInstallment
    })
    setStep('terms')
    router.push('/enrollment/terms')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Payment Plan
          </h2>

          <div className="mb-8">
            <p className="text-lg font-medium mb-2">
              Total Amount: S/. {totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Choose your preferred payment plan:
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {paymentOptions.map(({ installments, description }) => {
              const isSelected = selectedInstallments === installments
              const amountPerInstallment = totalAmount / installments

              return (
                <div
                  key={installments}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedInstallments(installments)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{description}</h3>
                      <p className="text-sm text-gray-600">
                        {installments} x S/. {amountPerInstallment.toFixed(2)}
                      </p>
                    </div>
                    <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                      {isSelected && (
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                setStep('courses')
                router.push('/enrollment/courses')
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue to Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
