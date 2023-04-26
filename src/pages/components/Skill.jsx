import React, { forwardRef } from 'react'
import { motion } from 'framer-motion';

const Skill = forwardRef((state, ref) => {
  return (
    <motion.section
      id="skill"
      className="relative p-4 snap-start"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full bg-blue-50'>Skill</div>
    </motion.section>
  );
})

export default Skill;