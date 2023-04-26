import React, { use, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer';

import { Home, NavBar, About, Skill, Portfolio, Contact } from '.';
import { AnimatePresence } from 'framer-motion';

const Main = () => {
  const [locaton, setLocation] = useState(null);

  const {ref: homeRef, inView: homeIsVisible} = useInView();
  const {ref: aboutRef, inView: aboutIsVisible} = useInView();
  const {ref: skillRef, inView: skillIsVisible} = useInView();
  const {ref: portfolioRef, inView: portfolioIsVisible} = useInView();
  const {ref: contactRef, inView: contactIsVisible} = useInView();

  useEffect(() => {
    if(homeIsVisible){
      setLocation("Home");
    }
    if(aboutIsVisible){
      setLocation("About");
    }
    if(skillIsVisible){
      setLocation("Skill");
    }
    if(portfolioIsVisible){
      setLocation("Portfolio");
    }
    if(contactIsVisible){
      setLocation("Contact Me");
    }
  }, [homeIsVisible, aboutIsVisible, skillIsVisible, portfolioIsVisible, contactIsVisible])

  const components = [
    <Home ref={homeRef} state={homeIsVisible} />,
    <About ref={aboutRef} state={aboutIsVisible} />,
    <Skill ref={skillRef} state={skillIsVisible} />,
    <Portfolio ref={portfolioRef} state={portfolioIsVisible} />,
    <Contact ref={contactRef} state={contactIsVisible} />,
  ];
  return (
    <AnimatePresence mode='wait'>
      <div className='relative w-screen h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide snap-y snap-mandatory'>
        <NavBar location={locaton}/>
        {...components}
      </div>
    </AnimatePresence>
  )
}

export default Main