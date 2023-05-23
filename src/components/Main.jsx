import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

import { Home, NavBar, About, Skill, Qualification, Contact } from '.';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

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
  
  return (
    <AnimatePresence mode='wait'>
      <Head>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <NavBar location={locaton}/>
      <div className='relative w-screen h-screen overflow-x-hidden overflow-y-scroll bg-white scrollbar-hide snap-y snap-mandatory dark:bg-neutral-700'>
        <Home ref={homeRef} state={homeIsVisible} />,
        <About ref={aboutRef} state={aboutIsVisible} />,
        <Skill ref={skillRef} state={skillIsVisible} />,
        <Qualification ref={qualificationRef} state={qualificationIsVisible} />,
        <Contact ref={contactRef} state={contactIsVisible} />,
      </div>
    </AnimatePresence>
  )
}

export default Main
