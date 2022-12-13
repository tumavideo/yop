import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'

const NoResults = ({ text }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-8xl">
        <MdOutlineVideocamOff />
      </p>
      <p className="text-center text-2xl">{text}</p>
    </div>
  )
}

export default NoResults
