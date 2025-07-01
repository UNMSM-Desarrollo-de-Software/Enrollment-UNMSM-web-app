import { create } from 'zustand'

interface StepperStore {
  currentStep: number
  totalSteps: number
  setStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  resetStepper: () => void
}

export const useStepperStore = create<StepperStore>((set) => ({
  currentStep: 0,
  totalSteps: 4,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
  })),
  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  resetStepper: () => set({ currentStep: 0 })
}))
