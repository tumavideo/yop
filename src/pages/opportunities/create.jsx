import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { classNames } from '@/lib/utils'
import { postSanityObject } from '@/lib/client'
import Breadcrumb from '@/components/Breadcrumb'

import {
  CreateCareer,
  CreateFinance,
  CreateJob,
  CreateMarket,
  CreateSkill,
} from '@/pages/job/functions'

import Router from 'next/router'
import { useStateContext } from '@/context/StateContext'
import Modal from '@/components/Modal'

const breadcrumbs = [
  { name: 'Opportunities', href: '/opportunities', current: false },
  { name: 'Create', href: '/job/create', current: true },
]

const settings = [
  {
    name: 'Public access',
    description: 'This project would be available to anyone who has the link',
  },
  {
    name: 'Private to Project Members',
    description: 'Only members of this project would be able to access',
  },
  {
    name: 'Private to you',
    description: 'You are the only one able to access this project',
  },
]

export default function Create() {
  const [overlay, setOverlay] = useState(false)
  const [values, setValues] = useState({})
  const {
    opportunities,
    selectedOpportunity,
    setOpportunities,
    setSelectedOpportunity,
  } = useStateContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    setOverlay(true)
    const oppType = selected.name.toLowerCase()

    const mutations = [
      {
        createOrReplace: {
          ...values,
          position: values.role,
          _draft: true,
          _type: oppType.slice(-1) === 's' ? oppType.slice(0, -1) : oppType,
        },
      },
    ]

    postSanityObject(mutations)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
      .finally(() => {
        e.target.reset()
        setTimeout(setOverlay(false), 3000)
      })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleChange = (opportunity) => {
    setSelectedOpportunity(opportunity)
  }

  return (
    <>
      {overlay && (
        <Modal
          body={
            'Your opportunity has been submitted to our moderation team. Expect to see your listing in the next 5 minutes. If not, someone from our support staff will be in touch.'
          }
          title={'Opportunity drafted'}
        />
      )}
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="min-h-full">
        <main className="py-10">
          {/* header */}
          {/* content area */}
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            {/* left */}
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {selectedOpportunity.name === 'Careers' && (
                    <CreateCareer onChange={onChange} />
                  )}
                  {selectedOpportunity.name === 'Finance' && (
                    <CreateFinance onChange={onChange} />
                  )}
                  {selectedOpportunity.name === 'Jobs' && (
                    <CreateJob onChange={onChange} />
                  )}
                  {selectedOpportunity.name === 'Market' && (
                    <CreateMarket onChange={onChange} />
                  )}
                  {selectedOpportunity.name === 'Skills' && (
                    <CreateSkill onChange={onChange} />
                  )}

                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => Router.push('/opportunities')}
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Create this opportunity
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* right */}
            <section
              aria-labelledby="timeline-title"
              className="lg:col-span-1 lg:col-start-3"
            >
              <RadioGroup value={selectedOpportunity} onChange={handleChange}>
                <RadioGroup.Label className="text-sm font-medium text-gray-900">
                  Opportunity Type
                </RadioGroup.Label>

                <div className="isolate mt-1 -space-y-px rounded-md bg-white shadow-sm">
                  {opportunities
                    .filter((o) => o.selected)
                    .map((setting, settingIdx) => (
                      <RadioGroup.Option
                        key={setting.name}
                        value={setting}
                        className={({ checked }) =>
                          classNames(
                            settingIdx === 0
                              ? 'rounded-tl-md rounded-tr-md'
                              : '',
                            settingIdx === settings.length - 1
                              ? 'rounded-bl-md rounded-br-md'
                              : '',
                            checked
                              ? 'z-10 border-blue-200 bg-blue-50'
                              : 'border-gray-200',
                            'relative flex cursor-pointer border p-4 focus:outline-none'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <span
                              className={classNames(
                                checked
                                  ? 'border-transparent bg-blue-600'
                                  : 'border-gray-300 bg-white',
                                active
                                  ? 'ring-2 ring-blue-500 ring-offset-2'
                                  : '',
                                'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border'
                              )}
                              aria-hidden="true"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                            <span className="ml-3 flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className={classNames(
                                  checked ? 'text-blue-900' : 'text-gray-900',
                                  'block text-sm font-medium'
                                )}
                              >
                                {setting.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={classNames(
                                  checked ? 'text-blue-700' : 'text-gray-500',
                                  'block text-sm'
                                )}
                              >
                                {setting.description}
                              </RadioGroup.Description>
                            </span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                </div>
              </RadioGroup>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
