import { useStateContext } from '@/context/StateContext'
import { CheckIcon } from '@heroicons/react/solid'
import Router from 'next/router'

export default function Stepper({
  activeStep,
  formValid,
  children,
  setActiveStep,
  steps,
}) {
  const { setOnboarded } = useStateContext()

  return (
    <>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step} className="relative md:flex md:flex-1">
              {activeStep > stepIdx ? (
                <a href="#" className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step}
                    </span>
                  </span>
                </a>
              ) : activeStep === stepIdx ? (
                <a
                  href="#"
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                    <span className="text-blue-600">0{stepIdx + 1}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-blue-600">
                    {step}
                  </span>
                </a>
              ) : (
                <a href="#" className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        0{stepIdx + 1}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute top-0 right-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <>{children}</>
      <div className="align-center flex justify-center p-24">
        <button
          onClick={() => {
            if (activeStep === steps.length - 1) {
              localStorage.setItem('onboarded', JSON.stringify(true))
              setOnboarded(true)
              Router.push('/')
            } else if (formValid) {
              setActiveStep((prev) => prev + 1)
            }
          }}
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="text-lg font-semibold text-white">
            {activeStep === steps.length - 1 ? 'Done' : 'Next'}
          </span>
        </button>
      </div>
    </>
  )
}
