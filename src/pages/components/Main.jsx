import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

import { Home, NavBar, About, Skill, Qualification, Contact } from '.';
import { AnimatePresence } from 'framer-motion';

const Main = () => {
  const [locaton, setLocation] = useState(null);

  const {ref: homeRef, inView: homeIsVisible} = useInView();
  const {ref: aboutRef, inView: aboutIsVisible} = useInView();
  const {ref: skillRef, inView: skillIsVisible} = useInView();
  const {ref: qualificationRef, inView: qualificationIsVisible} = useInView();
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
    if(qualificationIsVisible){
      setLocation("Qualification");
    }
    if(contactIsVisible){
      setLocation("Contact");
    }
  }, [homeIsVisible, aboutIsVisible, skillIsVisible, qualificationIsVisible, contactIsVisible])

  const components = [
    <Home ref={homeRef} state={homeIsVisible} />,
    <About ref={aboutRef} state={aboutIsVisible} />,
    <Skill ref={skillRef} state={skillIsVisible} />,
    <Qualification ref={qualificationRef} state={qualificationIsVisible} />,
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