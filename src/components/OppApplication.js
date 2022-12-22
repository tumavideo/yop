import { postSanityObject } from '@/lib/client'
import { inputs } from '@/utils/inputs'
import { useState } from 'react'
import Modal from './Modal'
import Thanks from './Thanks'

const FormHeading = ({ title, desc }) => (
  <div>
    <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{desc}</p>
  </div>
)

const Input = ({ handleChange, props, values }) => {
  const inputClass =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

  return (
    <div className={`sm:col-span-${props.className}`}>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        {props.type === 'textarea' && (
          <textarea
            {...props}
            onChange={handleChange}
            className={inputClass}
            defaultValue={''}
          />
        )}
        {(props.type === 'text' ||
          props.type === 'email' ||
          props.type === 'number') && (
          <input
            {...props}
            onChange={handleChange}
            value={values[props.name]}
            className={inputClass}
            // defaultValue={user[values.name]}
          />
        )}
        {props.type === 'select' && (
          <select
            {...props}
            onChange={handleChange}
            value={values[props.name]}
            className={inputClass}
          >
            {props.options.map((o, i) => (
              <option key={i}>{o}</option>
            ))}
          </select>
        )}
      </div>
      {props.type === 'textarea' && (
        <p className="mt-2 text-sm text-gray-500">{props.desc}</p>
      )}
    </div>
  )
}

export default function OppApplication({ farmer = false, opportunity, user }) {
  const [applied, setApplied] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [values, setValues] = useState({
    ...user,
  })

  user = { ...user, admin: false, social: false }

  const handleSubmit = (e) => {
    e.preventDefault()

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
        setApplied(true)
        setTimeout(setOverlay(false), 3000)
      })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      {applied && <Thanks opportunity={opportunity} />}
      {overlay && <Modal />}
      {!applied && (
        <form
          className="space-y-8 divide-y divide-gray-200 p-8"
          onSubmit={handleSubmit}
        >
          <div className={'space-y-8 divide-y divide-gray-200'}>
            {farmer && (
              <div>
                <FormHeading
                  title={'Farmer Information'}
                  desc={
                    'Please ensure that information provided is accurate for best results.'
                  }
                />
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {inputs.farmer.map((i) => (
                    <Input
                      key={i.id}
                      props={i}
                      values={values}
                      handleChange={onChange}
                    />
                  ))}
                </div>
              </div>
            )}

            {!farmer && (
              <>
                <div>
                  <FormHeading
                    title={'Personal Information'}
                    desc={'Use a permanent address where you can receive mail.'}
                  />
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {inputs.personal.map((i) => (
                      <Input
                        key={i.id}
                        props={i}
                        values={values}
                        handleChange={onChange}
                      />
                    ))}
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Resume
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                onChange={onChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            DOCX, PDF, PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    {inputs.address.map((i) => (
                      <Input
                        key={i.id}
                        props={i}
                        values={values}
                        handleChange={onChange}
                      />
                    ))}
                  </div>
                </div>
                {user?.social && (
                  <div className="pt-8">
                    <FormHeading
                      title={'Profile'}
                      desc={
                        'This information will be displayed publicly so be careful what you share.'
                      }
                    />
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <Input
                        key={'about'}
                        desc={'Write a few sentences about yourself.'}
                        props={{
                          id: 'about',
                          name: 'about',
                          type: 'textarea',
                          autoComplete: 'about',
                          label: 'About',
                          required: true,
                          rows: 3,
                          className: '6',
                        }}
                      />

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {user?.admin && (
                  <div className="pt-8">
                    <FormHeading
                      title={'Notifications'}
                      desc={
                        "We'll always let you know about important changes, but you pick what else you want to hear about."
                      }
                    />
                    <div className="mt-6">
                      <fieldset>
                        <legend className="sr-only">By Email</legend>
                        <div
                          className="text-base font-medium text-gray-900"
                          aria-hidden="true"
                        >
                          By Email
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                onChange={onChange}
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="candidates"
                                className="font-medium text-gray-700"
                              >
                                Candidates
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate applies for a job.
                              </p>
                            </div>
                          </div>
                          <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                onChange={onChange}
                                id="offers"
                                name="offers"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor="offers"
                                className="font-medium text-gray-700"
                              >
                                Offers
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate accepts or rejects
                                an offer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="mt-6">
                        <legend className="contents text-base font-medium text-gray-900">
                          Push Notifications
                        </legend>
                        <p className="text-sm text-gray-500">
                          These are delivered via SMS to your mobile phone.
                        </p>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              onChange={onChange}
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="push-everything"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Everything
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              onChange={onChange}
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="push-email"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Same as email
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              onChange={onChange}
                              id="push-nothing"
                              name="push-notifications"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="push-nothing"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              No push notifications
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
