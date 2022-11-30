import React from 'react'

export default function BouncingText(input) {
    const sentence = input.BouncingText.split('');
  return (
    <div className='mr-3 lg:mr-4'>
      {
        sentence.map((letter, index) => {
            return(
                <span key={index} className='bouncing lg:px-1'>
                    {letter}
                </span>
            )
        })
      }
    </div>
  )
}
