import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { classNames } from '@/lib/utils'
import { sidebarNav } from '@/utils/navigation'
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

const breadcrumbs = [
  { name: 'Opportunities', href: '/opportunities', current: false },
  { name: 'Edit', href: '/job/edit', current: true },
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

export default function EditOpportunity({ opportunity }) {
  const [state, setState] = useState('Jobs')
  const [selected, setSelected] = useState(settings[0])
  const [overlay, setOverlay] = useState(false)
  const [values, setValues] = useState({})

  const handleSubmit = (e) => {
    console.log(values)
    const types = sidebarNav.map((n) => n.name)
    console.log(types)
    e.preventDefault()
    return false

    setOverlay(true)

    const mutations = [
      {
        createOrReplace: {
          ...values,
          _type: 'user',
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

  return (
    <>
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
                  {state === 'Careers' && (
                    <CreateCareer
                      opportunity={opportunity}
                      onChange={onChange}
                    />
                  )}
                  {state === 'Finance' && (
                    <CreateFinance
                      opportunity={opportunity}
                      onChange={onChange}
                    />
                  )}
                  {state === 'Jobs' && (
                    <CreateJob opportunity={opportunity} onChange={onChange} />
                  )}
                  {state === 'Market' && (
                    <CreateMarket
                      opportunity={opportunity}
                      onChange={onChange}
                    />
                  )}
                  {state === 'Skills' && (
                    <CreateSkill
                      opportunity={opportunity}
                      onChange={onChange}
                    />
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
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Edit this opportunity
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
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="text-sm font-medium text-gray-900">
                  Opportunity Type
                </RadioGroup.Label>

                <div className="isolate mt-1 -space-y-px rounded-md bg-white shadow-sm">
                  {sidebarNav.map((setting, settingIdx) => (
                    <RadioGroup.Option
                      key={setting.name}
                      value={setting}
                      onClick={() => setState(setting.name)}
                      className={({ checked }) =>
                        classNames(
                          settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
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
      <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16"></main>
    </>
  )
}
