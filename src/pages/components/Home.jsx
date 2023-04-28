import React, { forwardRef } from 'react'

import { motion } from 'framer-motion';
import { Button, Link, Typography } from '@mui/material';
import TypeWriter from 'typewriter-effect'

import { AiOutlineCode } from 'react-icons/ai'
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi'
import { BsSend } from 'react-icons/bs';

const Home = forwardRef((state, ref) => {
  const socialLinks = [
    {
      icon: <FiLinkedin/>,
      link: 'https://www.linkedin.com/in/thanthein/'
    },
    {
      icon: <FiGithub/>,
      link: 'https://github.com/thantheinthwin'
    },
    {
      icon: <FiYoutube/>,
      link: 'https://www.youtube.com/@sforsteve'
    }
  ]

  return (
    <motion.section
      id="home"
      className="relative grid grid-cols-12 p-8 bg-white snap-start dark:bg-neutral-700"
    >
      <div ref={ref} className='grid justify-center grid-cols-1 col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 dark:text-white md:grid-cols-5'>
        {/* First div */}
        <div className='relative grid self-start col-span-1 gap-2 md:col-span-3 md:self-center'>
          <div className='flex items-center gap-2'>
            <Typography variant='subtitle1' sx={{ textTransform: 'uppercase', color: 'grey.500' }}>" be creative "</Typography>
            <AiOutlineCode className='text-xl text-neutral-500 dark:text-neutral-400'/>
          </div>
          <Typography variant='h3' sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}>Thant Hein Thwin</Typography>
          <Typography variant='h5' sx={{ color: 'grey.500' }} className='flex gap-2'>
            I am a
            <TypeWriter options={{
              strings: ['Web Developer', 'Programmer', 'Graphic Designer'],
              autoStart: true,
              loop: true,
            }}/>
          </Typography>
          <Button className='gap-2 mt-10 bg-black rounded-md shadow-none hover:bg-black hover:shadow-none dark:bg-white w-max' variant='contained'>Talk to me<BsSend/></Button>
          <div className='absolute flex-col hidden gap-4 md:flex top-10 -left-14 lg:-left-20'>
            {socialLinks.map((item, i) => <Link key={i} href={item.link} className='text-black md:text-2xl lg:text-3xl dark:text-white'>{item.icon}</Link>)}
          </div>
        </div>
        {/* Second div */}
        <div className='self-end order-first col-span-1 bg-blue-100 md:self-center md:order-none md:col-span-2'>2</div>
      </div>
      <div className='absolute flex flex-col gap-4 bottom-24 right-8 md:hidden'>
        {socialLinks.map((item, i) => <Link key={i} href={item.link} className='text-3xl text-black dark:text-white'>{item.icon}</Link>)}
      </div>
    </motion.section>
  );
})

export default Home;