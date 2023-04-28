import React, { forwardRef } from 'react'
import { motion } from 'framer-motion';

const Portfolio = forwardRef((state, ref) => {
  return (
    <motion.section
      id="portfolio"
      className="relative p-8 snap-start"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full bg-blue-50'>Portfolio</div>
    </motion.section>
  );
})

export default Portfolio