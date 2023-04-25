import { useContext } from 'react';
import { useTheme } from '@emotion/react';

import { ColorModeContext } from '..';

import { Button, Grid, IconButton, Link, Typography } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { BsSend } from 'react-icons/bs'

const NavBar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const links = [
    {
      to: 'Home',
      path: '#home'
    },
    {
      to: 'About',
      path: '#about'
    },
    {
      to: 'Skill',
      path: '#skill'
    },
    {
      to: 'Portfolio',
      path: '#portfolio'
    },
    {
      to: <Button className='text-black border-black rounded-md hover:text-white hover:border-transparent hover:bg-black dark:text-white dark:border-white dark:hover:text-black dark:hover:bg-white' variant='outlined' endIcon={<BsSend/>}>Contact Me</Button>,
      path: '#contact'
    }
  ]
  
  return (
    <div>
      <div>
        <Grid container padding={2} className='fixed bottom-0 z-20 md:top-0 md:bottom-auto' sx={{ bgcolor: 'background.default'}}>
          <Grid item xs={6} md={2}>
            <Typography variant='Logo' className='text-4xl dark:text-white'>Steve</Typography>
          </Grid>
          <Grid item md={8} className='items-center justify-center hidden gap-8 md:flex'>
            {links.map(link => <Link href={link.path} underline='none' className='text-black transition-all duration-200 ease-in-out dark:text-white hover:scale-110 hover:font-semibold'>{link.to}</Link>)}
          </Grid>
          <Grid item xs={6} md={2} className='flex justify-end'>
            <IconButton variant='text' onClick={colorMode.toggleTheme}>{theme.palette.mode === "dark" ? <DarkModeIcon/> : <LightModeIcon/>}</IconButton>
          </Grid>
        </Grid>
      </div>
      <div className='fixed top-0 z-10 flex items-center justify-center h-screen bg-slate-300'>
        <span className='-rotate-90'>Home</span>
      </div>
    </div>
  )
}

export default NavBar