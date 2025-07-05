'use client'

import { useRouter } from 'next/navigation'
import { useEnrollmentStore } from '@/store/useEnrollmentStore'

const mockCourses = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    schedule: 'Mon/Wed 10:00-12:00',
    professor: 'Dr. Smith',
    availableSeats: 30,
    credits: 4
  },
  {
    id: '2',
    code: 'CS102',
    name: 'Data Structures',
    schedule: 'Tue/Thu 14:00-16:00',
    professor: 'Dr. Johnson',
    availableSeats: 25,
    credits: 4
  },
  // Add more mock courses as needed
]

export default function CourseSelectionPage() {
  const router = useRouter()
  const { 
    selectedCourses,
    addCourse,
    removeCourse,
    getTotalCredits,
    setStep
  } = useEnrollmentStore()

  const handleCourseToggle = (course: any) => {
    const isSelected = selectedCourses.some(c => c.id === course.id)
    if (isSelected) {
      removeCourse(course.id)
    } else {
      addCourse(course)
    }
  }

  const handleNext = () => {
    if (selectedCourses.length > 0) {
      setStep('payment_plan')
      router.push('/enrollment/payment-plan')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select Your Courses
          </h2>
          
          <div className="space-y-4">
            {mockCourses.map((course) => {
              const isSelected = selectedCourses.some(c => c.id === course.id)
              
              return (
                <div
                  key={course.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleCourseToggle(course)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {course.code} - {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {course.schedule} • Prof. {course.professor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{course.credits} credits</p>
                      <p className="text-sm text-gray-600">
                        {course.availableSeats} seats available
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-semibold">
                Total Credits Selected: {getTotalCredits()}
              </p>
              <p className="text-lg font-semibold">
                Courses Selected: {selectedCourses.length}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedCourses.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
