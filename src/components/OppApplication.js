import { inputs } from '@/utils/inputs'
import { useState } from 'react'
import Modal from './Modal'
import Thanks from './Thanks'

const Input = ({ handleChange, props, values }) => (
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
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          // defaultValue={user[values.name]}
        />
      )}
      {props.type === 'select' && (
        <select
          {...props}
          onChange={handleChange}
          value={values[props.name]}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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

  const [applied, setApplied] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [values, setValues] = useState({
    ...user,
  })

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

    fetch(
      `https://${'d9p0l1rj'}.api.sanity.io/v2021-06-07/data/mutate/${'production'}`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error))
      .finally(() => {
        setApplied(true)
        setTimeout(setOverlay(false), 3000)
      })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="application">
      {applied && <Thanks opportunity={opportunity} />}
      {overlay && <Modal />}
      {!applied && (
        <form
          className="space-y-8 divide-y divide-gray-200 p-8"
          onSubmit={handleSubmit}
        >
          <div className={'space-y-8 divide-y divide-gray-200'}>
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
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
    </div>
  )
}
