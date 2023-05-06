import React, { forwardRef, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot} from '@mui/lab'

import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const Qualification = forwardRef((state, ref) => {
  const myRef = useRef();
  const isInView = useInView(myRef, {once: true});

  const [info, setInfo] = useState('education');

  const handleInfo = (event, newInfo) => {
    setInfo(newInfo);
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      }
    }
  }

  const title = {
    hidden: {opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1.6,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  const content = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 1.6,
        delay: 1.5
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      id="qualification"
      className="relative flex justify-center p-2 bg-white md:p-8 snap-start dark:bg-neutral-700"
    >
      <div
        ref={ref}
        className="flex flex-col items-center justify-center w-full h-full gap-4 dark:text-white"
      >
        <div ref={myRef} className='w-full'>
          { isInView &&
            <motion.div variants={container} initial='hidden' animate='show' exit='exit' className='grid items-center justify-center w-full grid-cols-1 text-center md:gap-4'>
              <motion.div variants={title}><Typography variant='h4' sx={{fontWeight: 'bold'}}>Qualification</Typography></motion.div>
              <motion.div variants={title}><Typography variant='body2' sx={{color: 'grey.700'}} className='mb-1'>My personal journey</Typography></motion.div>
              <motion.div variants={content} className='grid justify-center w-full grid-cols-1 md:gap-1'>
                <div className='col-span-full'>
                  <ToggleButtonGroup
                    aria-label='qualification formatting'
                    size='small'
                    value={info}
                    exclusive
                    onChange={handleInfo}  
                    sx={{color: 'grey.700', border: 1}}          
                  >
                    <ToggleButton value='education' className='flex gap-2'><SchoolIcon/>Education</ToggleButton>
                    <ToggleButton value='experience' className='flex gap-2'><WorkIcon/>Experience</ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {info == 'education' 
                  ? <div>
                      <Timeline position="alternate">
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Programming</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>Self study</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>2016 - Present</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Web Development</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>Myanmar Institute of Information Technology</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>Since 2017</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Level 5 Diploma in Computing</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>NCC Education</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>2022-2023</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Bachelor Degree in Computing (Hons)</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>NCC Education</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>Present</Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </div> 
                  : <div>
                    <Timeline position="alternate">
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Quality Assurance Developer</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>Armor Piercing Indie Games</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>Unity, C#</Typography><br/>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>2022</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Camping Fullstack Website</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>Personal Project</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>JavaScript, PHP, jQuery, mySQL, Bootstrap</Typography><br/>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>2023 Jan - 2023 Feb</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineDot variant="outlined" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant='body2' sx={{fontWeight: 'bold'}}>Music Streaming Website</Typography>
                            <Typography variant='body2' sx={{color: 'grey.700'}}>Personal Project</Typography>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>MERN Stack, TailwindCSS, Firebase, Postman</Typography><br/>
                            <Typography variant='caption' sx={{color: 'grey.700'}}>2023 Mar - 2023 July </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                  </div> }
              </motion.div>
            </motion.div>
          }
        </div>
      </div>
    </motion.section>
  );
})

export default Qualification