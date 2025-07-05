'use client'

import { EnrollmentStepper } from '@/components/Stepper/EnrollmentStepper'

export default function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <EnrollmentStepper />
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
