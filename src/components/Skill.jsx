import React, { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion';
import { Typography } from '@mui/material';

import { HiCheckBadge } from 'react-icons/hi2'

const Skill = forwardRef((state, ref) => {
  const titleRef = useRef();
  const isInView = useInView(titleRef, {once: true});

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

  const frontend = [
    {
      language: 'React',
      exp: 'Intermediate'
    },
    {
      language: 'Redux',
      exp: 'Beginner'
    },
    {
      language: 'NextJs',
      exp: 'Beginner'
    },
    {
      language: 'Tailwind',
      exp: 'Intermediate'
    },
    {
      language: 'Material UI',
      exp: 'Beginner'
    },
    {
      language: 'Git',
      exp: 'Intermediate'
    }
  ]

  const backend = [
    {
      language: 'NodeJs',
      exp: 'Intermediate'
    },
    {
      language: 'Express',
      exp: 'Beginner'
    },
    {
      language: 'MongoDB',
      exp: 'Beginner'
    },
    {
      language: 'Firebase',
      exp: 'Beginner'
    },
    { 
      language: 'MySQL',
      exp: 'Intermediate'
    },
    {
      language: 'PHP',
      exp: 'Beginner'
    }
  ]

  const programming = [
    {
      language: 'Java',
      exp: 'Intermediate'
    },
    {
      language: 'Python',
      exp: 'Intermediate'
    },
    {
      language: 'C',
      exp: 'Intermediate'
    },
    {
      language: 'C#',
      exp: 'Beginner'
    }
  ]

  const skills = [frontend, backend, programming];

  return (
    <motion.section
      id="skill"
      className="relative flex justify-center h-full p-8 bg-white snap-start dark:bg-neutral-700"
    >
      <div
        ref={ref}
        className="flex flex-col items-center justify-center w-5/6 gap-2 mb-4 md:mb-0 md:gap-4 dark:text-white"
      >
        <div className="grid w-full text-center" ref={titleRef}>
          {isInView && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div variants={title}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Skills
                </Typography>
              </motion.div>
              <motion.div variants={title}>
                <Typography variant="body2" sx={{ color: "grey.700" }}>
                  My technical level
                </Typography>
              </motion.div>
            </motion.div>
          )}
        </div>
        {isInView && 
          <motion.div
            className="grid w-full grid-cols-1 gap-2 lg:w-4/5 xl:w-2/3 md:w-5/6 lg:gap-6 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.75 }}
          >
            {skills.map((item, i) => {
              return (
                <motion.div key={i} className="border border-black rounded-md dark:border-white md:p-4">
                  {i == 0 && (
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Frontend Developer
                    </Typography>
                  )}
                  {i == 1 && (
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Backend Developer
                    </Typography>
                  )}
                  {i == 2 && (
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Programming Languages
                    </Typography>
                  )}
                  <div className="grid grid-cols-2 gap-2 m-2 lg:px-4">
                    {item.map((skill, i) => {
                      return (
                        <div key={i} className="flex col-span-1">
                          <HiCheckBadge className="m-1 text-xl" />
                          <div className="grid">
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {skill.language}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "grey.700" }}
                            >
                              {skill.exp}
                            </Typography>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        }
      </div>
    </motion.section>
  );
})

export default Skill;