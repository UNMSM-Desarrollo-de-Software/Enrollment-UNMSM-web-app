interface StepperProps {
  steps: string[]
  currentStep: number
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'border-2 border-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`ml-2 text-sm ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`ml-4 h-[2px] w-12 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
