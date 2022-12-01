import React from 'react'

export default function Header({ title = 'Jobs' }) {
  return (
    <div className="Header">
      <div className="mx-auto max-w-7xl py-8 sm:px-6 md:px-8">
        <h1 className="text-4xl font-semibold text-gray-900">{title}</h1>
      </div>
    </div>
  )
}
