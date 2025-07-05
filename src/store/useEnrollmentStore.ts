import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type EnrollmentStatus = 'enabled' | 'disabled' | 'in_progress' | 'completed'
export type EnrollmentStep = 'courses' | 'payment-plan' | 'terms' | 'payment' | 'confirmation'

interface Course {
  id: string
  code: string
  name: string
  schedule: string
  professor: string
  availableSeats: number
  credits: number
}

interface PaymentPlan {
  totalAmount: number
  installments: number
  amountPerInstallment: number
}

interface EnrollmentState {
  status: EnrollmentStatus
  currentStep: EnrollmentStep
  selectedCourses: Course[]
  paymentPlan: PaymentPlan | null
  termsAccepted: boolean
  paymentCompleted: boolean
  
  // Actions
  setStatus: (status: EnrollmentStatus) => void
  setStep: (step: EnrollmentStep) => void
  addCourse: (course: Course) => void
  removeCourse: (courseId: string) => void
  setPaymentPlan: (plan: PaymentPlan) => void
  acceptTerms: (accepted: boolean) => void
  completePayment: () => void
  resetEnrollment: () => void
  
  // Computed
  getTotalCredits: () => number
  getTotalAmount: () => number
}

const initialState = {
  status: 'disabled' as EnrollmentStatus,
  currentStep: 'courses' as EnrollmentStep,
  selectedCourses: [],
  paymentPlan: null,
  termsAccepted: false,
  paymentCompleted: false
}

export const useEnrollmentStore = create<EnrollmentState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStatus: (status) => set({ status }),
      
      setStep: (step) => set({ currentStep: step }),
      
      addCourse: (course) => 
        set((state) => ({
          selectedCourses: [...state.selectedCourses, course]
        })),
      
      removeCourse: (courseId) =>
        set((state) => ({
          selectedCourses: state.selectedCourses.filter(c => c.id !== courseId)
        })),
      
      setPaymentPlan: (plan) => set({ paymentPlan: plan }),
      
      acceptTerms: (accepted) => set({ termsAccepted: accepted }),
      
      completePayment: () => set({ 
        paymentCompleted: true,
        status: 'completed'
      }),
      
      resetEnrollment: () => set(initialState),
      
      getTotalCredits: () => {
        const state = get()
        return state.selectedCourses.reduce((sum, course) => sum + course.credits, 0)
      },
      
      getTotalAmount: () => {
        const state = get()
        const creditsPrice = 250 // Price per credit
        return state.getTotalCredits() * creditsPrice
      }
    }),
    {
      name: 'enrollment-storage'
    }
  )
)
