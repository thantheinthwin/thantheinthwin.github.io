import { useContext, useState } from 'react';
import { useTheme } from '@emotion/react';

import { AnimatePresence, motion } from "framer-motion";

import { ColorModeContext } from '../pages';

import { Button, Chip, Grid, IconButton, Link, Typography } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { AiOutlineAppstore } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { BsSend } from 'react-icons/bs'
import { HiOutlineHome, HiOutlineUserCircle, HiOutlineCode } from 'react-icons/hi'
import { MdOutlineWorkOutline } from 'react-icons/md'

const NavBar = (location) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: 'Home',
      link: '#home',
      icon: <HiOutlineHome className='m-2 text-xl'/>
    },
    {
      name: 'About',
      link: '#about',
      icon: <HiOutlineUserCircle className='m-2 text-xl'/>
    },
    {
      name: 'Skill',
      link: '#skill',
      icon: <HiOutlineCode className='m-2 text-xl'/>
    },
    {
      name: 'Qualification',
      link: '#qualification',
      icon: <MdOutlineWorkOutline className='m-2 text-xl'/>
    },
    {
      name: 'Work with me',
      link: '#contact',
      icon: <BsSend className='m-2 text-xl'/>
    }
  ]
  
  return (
    <div>
      <div>
        <Grid
          container
          padding={2}
          className="fixed bottom-0 z-30 shadow md:top-0 md:bottom-auto"
          sx={{ bgcolor: "background.default" }}
        >
          <Grid item xs={6} md={2}>
            <Typography variant="Logo" className="text-4xl dark:text-white">
              Steve
            </Typography>
          </Grid>
          <Grid
            item
            md={8}
            className="items-center justify-center hidden gap-8 md:flex"
          >
            {links.map((link, i, {length}) => {
              if(i + 1 == length){
                return (
                  <Link
                    key={i}
                    href={link.link}
                    underline="none"
                    className="transition-all duration-200 ease-in-out hover:scale-110 hover:font-semibold"
                  >
                    <Button
                      className="text-black border-black rounded-md hover:text-white hover:border-transparent hover:bg-black dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white"
                      variant="outlined"
                      endIcon={<BsSend />}
                    >
                      {link.name}
                    </Button>
                  </Link>
                );
              }else{
                return(
                  <Link
                  key={i}
                  href={link.link}
                  underline="none"
                  className="text-black transition-all duration-200 ease-in-out dark:text-white hover:scale-110 hover:font-semibold"
                  >
                    {link.name}
                  </Link>
                )
              }
            })}
          </Grid>
          <Grid item xs={6} md={2} className="flex justify-end">
            <IconButton variant="text" onClick={colorMode.toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </div>
      
      {/* Sidebar */}
      <div className="fixed top-0 z-10 flex flex-col items-center justify-between h-screen w-14 md:hidden">
        <div className="flex flex-col items-center w-full pt-5 h-1/6">
          <IconButton variant="text" onClick={() => setMenuOpen(!menuOpen)}>
            <AiOutlineAppstore />
          </IconButton>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-2/6">
          <span className="-rotate-90">
            <Chip label={location?.location} variant="outlined" />
          </span>
        </div>
      </div>

      {/* menu for mobile view */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="fixed z-20 grid w-screen h-screen grid-cols-4 grid-rows-6 bg-white dark:bg-neutral-800"
          >
            <div className="flex items-start justify-end row-span-1 col-span-full">
              <IconButton variant="text" onClick={() => setMenuOpen(!menuOpen)}>
                <IoClose />
              </IconButton>
            </div>
            <motion.div className="grid col-span-2 col-start-2 grid-rows-5 row-span-4 gap-6">
              {links.map((item, i) => (
                <Button
                  variant="outlined"
                  key={i}
                  className="row-span-1 text-black border-black rounded-lg focus:border-black hover:border-black dark:text-white dark:border-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <a href={item.link} className='flex items-center justify-center w-full h-full'>
                    <div className='flex flex-col items-center justify-center'>
                      {item.icon}
                      {item.name}
                    </div>
                  </a>
                </Button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavBar