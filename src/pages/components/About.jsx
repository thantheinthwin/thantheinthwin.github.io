import React, { forwardRef } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProfilePic } from '../../../public/assets/images';
import { Button, Icon, Typography } from '@mui/material';

import { HiOutlineCheckBadge } from 'react-icons/hi2'
import { CgWorkAlt } from 'react-icons/cg'
import { FiDownload } from 'react-icons/fi';

const About = forwardRef((state, ref) => {
  const introduction = [
    {
      badge: <HiOutlineCheckBadge/>,
      title: 'Experience',
      info: '4 + Years'
    },
    {
      badge: <CgWorkAlt/>,
      title: 'Completed',
      info: '4 + Projects'
    }
  ]

  return (
    <motion.section
      id="about"
      className="relative grid grid-cols-12 bg-white snap-start dark:bg-neutral-700"
    >
      <div
        ref={ref}
        className="grid justify-center grid-cols-1 col-span-10 col-start-2 gap-4 lg:col-span-8 lg:col-start-3 dark:text-white md:grid-cols-6"
      >
        <div className='self-end w-2/3 col-span-1 justify-self-center md:self-center md:col-span-2 md:w-full shadow-solidshadow dark:shadow-neutral-500'>
          <Image src={ProfilePic} alt='ProfilePic' className='object-cover filter grayscale'/>
        </div>
        <div className='flex flex-col col-span-1 p-6 text-center md:justify-center md:text-left md:col-span-4'>
          <Typography variant='h4' sx={{fontWeight: 'bold'}}>About Me</Typography>
          <Typography variant='h6' sx={{color: 'grey.700'}} className='mb-2'>My Introduction</Typography>
          <Typography align='justify' variant='body2' paragraph={true} sx={{fontWeight: 'light'}}>
            I love to create web applications basically through MERN technology and I have also built some using PHP. 
            I have over 3 years of experience in web development. And I am currently a student persuing a Bachelor Degree in Computing with honours through NCC educaton.
          </Typography>
          <div className='grid grid-cols-2 gap-3'>
            {introduction.map((item, i) => {
              return(
                <div key={i} className='flex flex-col items-center col-span-1 p-2 text-center border border-black rounded-md dark:border-white'>
                  <Icon fontSize='medium'>{item.badge}</Icon>
                  <Typography variant='subtitle2'>{item.title}</Typography>
                  <Typography variant='body2' sx={{color: 'grey.700'}}>{item.info}</Typography>
                </div>
              )
            })}
          </div>
          <Button
            className="gap-2 mt-4 bg-black rounded-md shadow-none md:mt-6 hover:bg-black hover:shadow-none dark:bg-white w-max"
            variant="contained"
          >
            Download CV
            <FiDownload/>
          </Button>
        </div>
      </div>
      {/* {console.log("About : ", state)} */}
    </motion.section>
  );
})

export default About