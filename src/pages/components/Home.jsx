import React, { forwardRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion';
import { Button, IconButton, Link, Typography } from '@mui/material';
import TypeWriter from 'typewriter-effect'

import { AiOutlineCode, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi'
import { BsSend } from 'react-icons/bs';

import { GeekPic } from '../../../public/assets/images';
import Image from 'next/image';
import moment from 'moment/moment';

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

  // Finding age using moment.js
  const birthdate = '2000-11-01';
  const age = moment().diff(birthdate, 'year');

  const [moreInfo, setMoreInfo] = useState(false);

  const info = ['MERN Stack', 'NextJs', ,'Redux', 'PHP', 'Python', 'Jquery', 'C', 'C#', 'Java', 'Firebase', 'MySql', 'MariaDB', 'Git', 'Unity', 'Tailwind', 'Material UI', 'Bootstrap 5'];

  return (
    <motion.section
      id="home"
      className="relative grid grid-cols-12 bg-white snap-start dark:bg-neutral-700"
    >
      <div
        ref={ref}
        className="grid justify-center grid-cols-1 col-span-10 col-start-2 gap-4 lg:col-span-8 lg:col-start-3 dark:text-white md:grid-cols-6 lg:grid-cols-5"
      >
        {/* First div */}
        <div className="relative grid self-start col-span-1 gap-2 md:col-span-3 md:self-center">
          <Typography
            variant="subtitle1"
            sx={{ textTransform: "uppercase", color: "grey.500" }}
          >
            " be creative " 🧑‍💻
          </Typography>
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontWeight: "medium" }}
          >
            Thant Hein Thwin
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "grey.500" }}
            className="flex gap-2"
          >
            I am a
            <TypeWriter
              options={{
                strings: ["Web Developer", "Programmer", "Graphic Designer"],
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>
          <Button
            className="gap-2 mt-4 bg-black rounded-md shadow-none md:mt-10 hover:bg-black hover:shadow-none dark:bg-white w-max"
            variant="contained"
            onClick={() => window.location = '#contact'}
          >
            Talk to me
            <BsSend />
          </Button>

          {/* Social Links */}
          <div className="absolute flex-col hidden gap-4 md:flex top-10 -left-14 lg:-left-20">
            {socialLinks.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="text-black md:text-2xl lg:text-3xl dark:text-white"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Second div */}
        <div className="flex flex-row self-end justify-center order-first w-2/3 col-span-1 md:w-full md:self-center md:order-none md:col-span-3 lg:col-span-2">
          <div className="p-2 transition-all border border-black rounded-lg lg:p-4 dark:border-white">
            <div className="p-1 corner-border md:pb-6 lg:pb-0 dark:border-white dark:before:bg-neutral-700 dark:after:bg-neutral-700 lg:p-3">
              <div className="relative z-10 grid gap-2 divide-y">
                <Image
                  src={GeekPic}
                  alt="GeekPic"
                  className="object-cover rounded bg-neutral-200 dark:bg-neutral-600"
                />
                <Typography
                  variant="caption"
                  className="absolute left-0 right-0 hidden px-2 py-1 m-auto bg-white rounded-full shadow lg:left-auto lg:bottom-auto w-max -bottom-5 lg:right-0 lg:m-2 dark:bg-neutral-400 md:flex"
                >
                  Age : {age}
                </Typography>
                <div className="hidden gap-2 px-2 pt-2 divide-y lg:grid">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h5">Web Developer</Typography>
                      <Typography variant="body2" sx={{ fontWeight: "light" }}>
                        @steve
                      </Typography>
                    </div>
                    <AiOutlineCode className="text-3xl text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <div>
                    <AnimatePresence>
                      {moreInfo && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.25 },
                          }}
                          transition={{ duration: 0.5 }}
                          className="grid grid-cols-2 gap-1 pt-2"
                        >
                          <Typography variant="h6" className="col-span-2">
                            Technologies I use
                          </Typography>
                          {info.map((item, i) => (
                            <Typography
                              key={i}
                              variant="body2"
                              className="col-span-1 text-neutral-600 dark:text-neutral-300"
                            >
                              {item}
                            </Typography>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col items-center justify-center gap-1 py-2">
                      {!moreInfo && (
                        <AnimatePresence mode='wait'>
                          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 1 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "grey.700" }}
                            >
                              More about me
                            </Typography>
                          </motion.div>
                        </AnimatePresence>
                      )}
                      <IconButton
                        onClick={() => setMoreInfo(!moreInfo)}
                        sx={{ fontSize: "1rem" }}
                      >
                        {!moreInfo ? <AiOutlineDown /> : <AiOutlineUp />}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links for mobile view */}
      <div className="absolute flex flex-col gap-4 bottom-24 right-8 md:hidden">
        {socialLinks.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="text-3xl text-black dark:text-white"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </motion.section>
  );
})

export default Home;