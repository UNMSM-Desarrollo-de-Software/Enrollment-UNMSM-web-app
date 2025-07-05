'use client'

import { usePathname } from 'next/navigation'

interface Step {
  title: string
  path: string
  description: string
}

const steps: Step[] = [
  { 
    title: 'Cursos', 
    path: '/enrollment/courses',
    description: 'Selección de cursos disponibles'
  },
  { 
    title: 'Pagos', 
    path: '/enrollment/payment-plan',
    description: 'Plan de pagos y cuotas'
  },
  { 
    title: 'Términos', 
    path: '/enrollment/terms',
    description: 'Aceptación de términos'
  },
  { 
    title: 'Pago', 
    path: '/enrollment/payment',
    description: 'Proceso de pago'
  },
  { 
    title: 'Constancia', 
    path: '/enrollment/confirmation',
    description: 'Confirmación de matrícula'
  }
]

export function EnrollmentStepper() {
  const pathname = usePathname()
  const currentStepIndex = steps.findIndex(step => step.path === pathname)

  return (
    <nav aria-label="Progress" className="px-4 py-6">
      <ol role="list" className="space-y-6 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.title} className="md:flex-1">
            <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <span className={`text-sm font-medium ${
                index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Paso {index + 1}
              </span>
              <span className="text-sm font-medium">{step.title}</span>
              {index === currentStepIndex && (
                <span className="text-sm text-gray-500">{step.description}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
