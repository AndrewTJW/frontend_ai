import { useState } from "react"
import React from 'react'

const InputStock = () => {
    const [isDisabled, setDisabled] = useState(false)
    const [stockSymbol, setStockSymbol] = useState('')
    const [submittedStockSymbol, setSubmittedStockSymbol] = useState('');
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [isErrorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setDisabled(true)
    setIsError(false)
    setErrorMessage('')
    setResult(null)
    try {
      const response = await fetch('https://backend-ai-092n.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: stockSymbol }),
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json()
      setResult(data)
      console.log(data)
    } catch (err) {
      console.error('Error:', err)
      setIsError(true)
      setErrorMessage(err.message || 'Failed to fetch prediction')
    }

    setLoading(false)
    setDisabled(false)
    setSubmittedStockSymbol(stockSymbol)
    setStockSymbol('')
  }
  return (
    <>
    <div className="flex justify-center">
      <div className="mt-4 md:mt-6 lg:mt-8 w-full max-w-md px-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="block mt-16 mb-12 w-full">
            <label
              htmlFor="stock_symbol"
              className="font-formula-regular mb-2 block text-base md:text-lg lg:text-xl font-medium text-gray-900"
            >
              Enter your stock symbol
            </label>
            <input
              type="text"
              id="stock_symbol"
              className="font-formula-regular bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none focus:border-red-500 focus:ring-0"
              placeholder="Enter stock symbol"
              value={stockSymbol}
              disabled={isDisabled}
              onChange={(e) => setStockSymbol(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-black border border-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-6 py-2.5 text-center"
          >
            {loading ? 'Predicting...' : 'Submit'}
          </button>
        </form>

        {isError && (
          <div className="mt-4 p-3 border border-red-400 text-red-600 bg-red-100 rounded font-formula-regular">
            ⚠️ {isErrorMessage}
          </div>
        )}
        {result && (
            <div className="mt-8 p-4 border rounded bg-gray-50">
              <h2 className="text-lg font-bold mb-2 font-formula-bold">Prediction Result for <span className="font-formula-bold text-red-600">{submittedStockSymbol.toUpperCase()}</span></h2>
              <p>Today's Price: ${result.today_price}</p>
              <p>Predicted Price: ${result.predicted_price}</p>
              <p>Predicted Return: {result.predicted_return_percent}%</p>
              <p>Direction: {result.direction}</p>
            </div>
        )}
      </div>
    </div>
    </>
  )
}

export default InputStock