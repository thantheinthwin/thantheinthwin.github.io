import React from 'react'

export default function FlipText(input) {
    const sentence = input.FlipText.split("");
  return (
    <div>
      {
        sentence.map((letter, index) => {
            return (
                <span key={index} className='mirror lg:p-1'>
                    {letter}
                </span>
            )
        })
      }
    </div>
  );
}
