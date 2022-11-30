import React from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useState } from 'react';

export default function FlipTextSpan({children}) {
    const [isPlaying, setIsPlaying] = useState(false);  
    const controls = useAnimationControls();

    const mirror = () => {
        controls.start({
        transform : [
            'matrix(-1, 0, 0, 1, 0, 0)',
            'matrix(-1, 0, 0, 1, 0, 0)',
            'matrix(1, 0, 0, 1, 0, 0)',
        ],
        })
        setIsPlaying(true);
    }

  return (
    <div>
      <motion.span 
                animate={controls}
                onMouseOver={() => {
                  if(!isPlaying)
                    mirror()
                }}
                className='mirror lg:p-1'>
                    {children}
                </motion.span>
    </div>
  )
}
