import React, { forwardRef } from 'react'
import { motion } from 'framer-motion';

const About = forwardRef((state, ref) => {
  return (
    <motion.section
      id="about"
      className="relative p-8 snap-start"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full bg-blue-50'>About</div>
      {/* {console.log("About : ", state)} */}
    </motion.section>
  );
})

export default About