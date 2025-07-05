'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

export default function EnrollmentPage() {
  const router = useRouter()
  const { status, setStatus } = useEnrollmentStore()

  useEffect(() => {
    // TODO: Replace with actual API call
    const checkEnrollmentStatus = async () => {
      // Simulating API call
      const mockStatus = 'enabled'
      setStatus(mockStatus as any)
    }

    checkEnrollmentStatus()
  }, [setStatus])

  useEffect(() => {
    if (status === 'enabled') {
      router.push('/enrollment/courses')
    } else if (status === 'in_progress') {
      // TODO: Redirect to last active step
      router.push('/enrollment/courses')
    } else if (status === 'completed') {
      router.push('/enrollment/confirmation')
    }
  }, [status, router])

  const getStatusMessage = () => {
    switch (status) {
      case 'disabled':
        return 'Your enrollment period is not yet available.'
      case 'enabled':
        return 'Redirecting to course selection...'
      case 'in_progress':
        return 'Resuming your enrollment process...'
      case 'completed':
        return 'Redirecting to your enrollment confirmation...'
      default:
        return 'Checking enrollment status...'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enrollment Status
        </h2>
        <p className="text-gray-600">
          {getStatusMessage()}
        </p>
      </div>
    </div>
  )
}
