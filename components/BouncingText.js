import React from 'react'
import BouncingTextSpan from './BouncingTextSpan';

export default function BouncingText(input) {
    const sentence = input.BouncingText.split('');

  return (
    <div className='flex'>
      {
        sentence.map((letter, index) => {
            return(
                <BouncingTextSpan key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </BouncingTextSpan>
            )
        })
      }
    </div>
  )
}
