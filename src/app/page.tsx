'use client'

import { useState } from 'react'
import Image from 'next/image'
import { StepperContainer } from '@/components/StepperContainer/StepperContainer'

export default function Home() {
  const [isProcessStarted, setIsProcessStarted] = useState(false)

  if (isProcessStarted) {
    return <StepperContainer />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <Image
          className="mx-auto mb-8"
          src="/next.svg"
          alt="Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Student Enrollment</h1>
        <p className="text-lg text-gray-600 mb-8">
          Start your enrollment process by clicking the button below. The process consists of 4 simple steps.
        </p>
        <button
          onClick={() => setIsProcessStarted(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Enrollment Process
        </button>
      </div>
    </div>
  )
}
