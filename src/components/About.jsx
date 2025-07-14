import React from 'react'
import Card from './Card'

const About = () => {
  return (
    <>
        <section className='relative h-screen flex flex-col items-center'>
            <div className='max-w-max mx-auto block mb-38 lg:mb-60  font-formula-bold text-2xl md:text-4xl lg:text-6xl'>
                How it works 
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 content-evenly gap-20 md:gap-20 lg:gap-50 px-4 max-w-full w-full justify-items-center z-20'>
                <Card title='Model' description='Used linear regression to identidy the pattern of stock prices'/>
                <Card title='OBV' description='Implemented On Balance Volume to as a technical indicator whether the stock will go up or down'/>
                <Card title='RSI' description='Implemented Relative Stregth Index to indentify a stock is overvalued or undervalued'/>
            </div>
        </section>
    </>
  )
}

export default About