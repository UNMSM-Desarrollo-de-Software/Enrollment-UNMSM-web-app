'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'
import { useAuthStore } from '@/store/useAuthStore'

export default function ConfirmationPage() {
  const router = useRouter()
  const user = useAuthStore(state => state.user)
  const {
    selectedCourses,
    paymentPlan,
    status,
    getTotalCredits,
    getTotalAmount
  } = useEnrollmentStore()

  useEffect(() => {
    if (status !== 'completed') {
      router.push('/enrollment')
    }
  }, [status, router])

  if (!user || status !== 'completed') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enrollment Confirmation
            </h2>
            <p className="text-gray-600">
              Your enrollment has been successfully completed
            </p>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <h3 className="font-semibold mb-4">Student Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Student Code</p>
                <p className="font-medium">{user.code}</p>
              </div>
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Enrolled Courses</h3>
            <div className="space-y-3">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">
                      {course.code} - {course.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.schedule} • Prof. {course.professor}
                    </p>
                  </div>
                  <p className="text-gray-600">{course.credits} credits</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Payment Information</h3>
            <div className="bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">Total Credits</p>
                  <p className="font-medium">{getTotalCredits()} credits</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-medium">S/. {getTotalAmount().toFixed(2)}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-600 mb-1">Payment Plan</p>
                <p className="font-medium">
                  {paymentPlan?.installments} installment(s) of S/. {paymentPlan?.amountPerInstallment.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
