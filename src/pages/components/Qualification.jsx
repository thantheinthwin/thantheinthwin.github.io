import React, { forwardRef } from 'react'
import { motion } from 'framer-motion';

const Qualification = forwardRef((state, ref) => {
  return (
    <motion.section
      id="qualification"
      className="relative p-8 snap-start"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full bg-blue-50'>Qualification</div>
    </motion.section>
  );
})

export default Qualification