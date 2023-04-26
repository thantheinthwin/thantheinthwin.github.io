import React, { forwardRef } from 'react'

import { motion } from 'framer-motion';

const Home = forwardRef((state, ref) => {
  return (
    <motion.section
      id="home"
      className="relative p-4 snap-start"
    >
      <div ref={ref} className='flex items-center justify-center w-full h-full bg-blue-50'>Home</div>
      {/* {console.log("Home : ", state)} */}
    </motion.section>
  );
})

export default Home;