import React from 'react'
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Box
      sx={{ bgcolor: "background.default", color: "text.primary" }}
      className="relative flex items-center justify-center w-screen h-screen snap-start"
      id="home"
    >
      Home
    </Box>
  );
}

export default Home