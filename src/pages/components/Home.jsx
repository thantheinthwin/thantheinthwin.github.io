import React, { forwardRef } from 'react'

import { motion } from 'framer-motion';

const Home = forwardRef((state, ref) => {
  return (
    <motion.section
      id="home"
      className="relative p-4 bg-white snap-start dark:bg-neutral-700"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full dark:text-white'>Home</div>
      {/* {console.log("Home : ", state)} */}
    </motion.section>
  );
})

export default Home;