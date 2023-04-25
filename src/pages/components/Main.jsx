import React from 'react'

import { Home, NavBar, About, Skill, Portfolio, Contact } from '.';

const Main = () => {
  const components = [<Home/>, <About/>, <Skill/>, <Portfolio/>, <Contact/>];

  return (
    <div className='relative w-screen h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide snap-y snap-mandatory'>
      <NavBar />
      {...components}
    </div>
  )
}

export default Main