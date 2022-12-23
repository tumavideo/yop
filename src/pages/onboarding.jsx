import { Card } from '@/components/card'
import Form from '@/components/form/Form'
import Stepper from '@/components/Stepper'
import { inputs } from '@/utils/inputs'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const items = [
  'Confirm personal details',
  'What can we help you with?',
  'How did you learn about us?',
  'Confirm your interests',
]

export default function Onboarding() {
  const [steps, setSteps] = useState(items)
  const [values, setValues] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const { data: session } = useSession()

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        formValid={true}
        setActiveStep={setActiveStep}
        steps={steps}
      >
        {activeStep === 0 && (
          <Form
            desc={'Please confirm your personal details'}
            inputs={inputs.personal}
            title={'Nice to meet you!'}
            values={
              session && {
                ...session.user,
                firstName: session.user?.name.split(' ')[0],
                lastName: session.user?.name.split(' ')[1],
              }
            }
            onChange={onChange}
          />
        )}
        {activeStep === 1 && (
          <Form
            desc={'Tell us more about yourself'}
            inputs={inputs.help}
            title={`
              Hello there ${session && session.user.name}
            `}
            values={values}
            onChange={onChange}
          />
        )}
        {activeStep === 2 && (
          <Form
            desc={'Please choose one'}
            inputs={inputs.how}
            title={'How did you find out about the opportunity portal?'}
            values={values}
            onChange={onChange}
          />
        )}
        {activeStep === 3 && <Card />}
      </Stepper>
    </div>
  )
}
