import React from 'react'
import FlipTextSpan from './FlipTextSpan';

export default function FlipText(input) {
    const sentence = input.FlipText.split("");

  return (
    <div className='flex'>
      {
        sentence.map((letter, index) => {
            return (
                <FlipTextSpan key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </FlipTextSpan>
            )
        })
      }
    </div>
  );
}
