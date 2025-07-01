'use client'

import { useStepperStore } from '@/store/useStepperStore'
import { Stepper } from '@/components/Stepper/Stepper'
import { Step1, Step2, Step3, Step4 } from '@/components/Steps/Steps'

const steps = ['Personal Info', 'Academic Info', 'Documents', 'Review']
const stepComponents = [Step1, Step2, Step3, Step4]

export const StepperContainer = () => {
  const { currentStep, nextStep, previousStep } = useStepperStore()
  const CurrentStepComponent = stepComponents[currentStep]

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Stepper steps={steps} currentStep={currentStep} />
      
      <div className="mt-8">
        <CurrentStepComponent />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={previousStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
