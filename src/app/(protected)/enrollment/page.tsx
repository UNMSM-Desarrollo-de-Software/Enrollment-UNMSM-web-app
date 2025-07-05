'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

export default function EnrollmentPage() {
  const router = useRouter()
  const { status, setStatus, currentStep, setStep } = useEnrollmentStore()

  useEffect(() => {
    // TODO: Replace with actual API call
    const checkEnrollmentStatus = async () => {
      // Simulating API call
      const mockStatus = 'enabled'
      setStatus(mockStatus as any)
    }

    checkEnrollmentStatus()
  }, [setStatus])

  // Manejar estado "in_progress"
  useEffect(() => {
    if (status === 'in_progress' && currentStep) {
      router.push(`/enrollment/${currentStep}`)
    }
  }, [status, currentStep, router])

  const handleStartEnrollment = () => {
    setStatus('in_progress')
    setStep('courses')
    router.push('/enrollment/courses')
  }

  if (status === 'disabled') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Matrícula No Disponible
            </h2>
            <p className="text-gray-600">
              Lo sentimos, el período de matrícula aún no está habilitado. Por favor, revisa las fechas programadas.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'completed') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Matrícula Completada
            </h2>
            <p className="text-gray-600 mb-4">
              Tu proceso de matrícula ya ha sido completado exitosamente.
            </p>
            <button
              onClick={() => router.push('/enrollment/confirmation')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Constancia
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'enabled') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Bienvenido al Proceso de Matrícula!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu período de matrícula está habilitado. Puedes iniciar el proceso cuando estés listo.
            </p>
            <button
              onClick={handleStartEnrollment}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Iniciar Proceso de Matrícula
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Estado por defecto (loading)
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Verificando Estado
        </h2>
        <p className="text-gray-600">
          Por favor espera mientras verificamos tu estado de matrícula...
        </p>
      </div>
    </div>
  )
}
