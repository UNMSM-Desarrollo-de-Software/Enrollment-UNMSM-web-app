'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

export default function TermsPage() {
  const router = useRouter()
  const { acceptTerms, setStep } = useEnrollmentStore()
  const [isAccepted, setIsAccepted] = useState(false)

  const handleNext = () => {
    if (isAccepted) {
      acceptTerms(true)
      setStep('payment')
      router.push('/enrollment/payment')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h2>

          <div className="prose prose-sm max-w-none mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Enrollment Agreement
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 h-64 overflow-y-auto">
              <p className="mb-4">
                1. Academic Responsibility:
                By enrolling in these courses, you agree to:
                - Attend all required classes
                - Complete all assignments and examinations
                - Maintain academic integrity
              </p>

              <p className="mb-4">
                2. Financial Obligation:
                - You are responsible for paying all tuition and fees
                - Payment must be made according to the selected payment plan
                - Non-payment may result in withdrawal from courses
              </p>

              <p className="mb-4">
                3. Course Changes:
                - Course changes can only be made during the add/drop period
                - After this period, no refunds will be issued
              </p>

              <p className="mb-4">
                4. Attendance Policy:
                - Regular attendance is required
                - Excessive absences may affect your grade
              </p>

              <p>
                5. Code of Conduct:
                You agree to follow the university's code of conduct and academic policies.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">
                I have read and agree to the terms and conditions of enrollment.
                I understand my academic and financial obligations.
              </span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                setStep('payment_plan')
                router.push('/enrollment/payment-plan')
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isAccepted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
