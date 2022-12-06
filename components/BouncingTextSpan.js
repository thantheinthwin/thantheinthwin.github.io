import React from 'react'
import { motion, useAnimationControls} from 'framer-motion'
import { useState } from 'react'

export default function BouncingTextSpan({children}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const controls = useAnimationControls();

    const bouncing = () => {
        controls.start({
            transform: [
                "scale3d(1, 1, 1)",
                "scale3d(1.4, .55, 1)",
                "scale3d(.75, 1.25, 1)",
                "scale3d(1.25, .85, 1)",
                "scale(.9, 1.05, 1)",
                "scale3d(1, 1, 1)",
            ]
        })
        setIsPlaying(true);
    }

  return (
    <div>
      <motion.span 
                animate={controls}
                onMouseOver={() => {
                    if(!isPlaying)
                        bouncing()
                }}
                onAnimationComplete={() => setIsPlaying(false)}
                className='bouncing lg:px-1'>
        {children}
      </motion.span>
    </div>
  )
}
