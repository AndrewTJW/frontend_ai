import React from 'react'

const Card = ({ title, description }) => {
  return (
    <div className="w-64 h-64 bg-transparent opacity-90 rounded-4xl shadow-2xl flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-red-500 text-xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-black">{description}</p>
    </div>
  )
}

export default Card