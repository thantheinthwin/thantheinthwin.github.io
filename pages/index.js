import Head from 'next/head';
import React,{useState, useEffect} from 'react';
import Typewriter from 'typewriter-effect';
import ReactCardFlip from 'react-card-flip';

import { BsMoonStarsFill } from 'react-icons/bs';
import { IoMenuOutline } from "react-icons/io5";
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';

import Image from 'next/image';
import ProfilePic from '../public/Profile.png';

import { TbArrowBarDown } from 'react-icons/tb';

export default function Home() {
  const [flip, setFlip] = useState(false);

  const [theme, setTheme] = useState(null);

  //Matching with system pref
  useEffect(() => {
    if(window.matchMedia('{prefers-color-scheme : dark}').matches){
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }, [])

  //Dark Mode
  useEffect(() => {
    if (theme === 'dark'){
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }; 

  const Links = [
    {name: "Home", link: "/"},
    {name: "About", link: "/"},
    {name: "Skills", link: "/"},
    {name: "Projects", link: "/"},
    {name: "Contact", link: "/"},
  ];

  const SocialLinks = [
    {name: 'LinkedIn', logo: <AiFillLinkedin/>, links: 'https://www.linkedin.com/in/thanthein/'},
    {name: 'Github', logo: <FaGithubSquare/>, links: 'https://github.com/thantheinthwin'},
    {name: 'YouTube', logo: <AiFillYoutube/>, links: 'https://www.youtube.com/@sforsteve'},
  ]

  const [active,setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  }

  return (
    <div>
      <Head>
        <title>Steve's Portfolio</title>
        <link rel='icon' href='/Logo.png'></link>
      </Head>

      <main>
        <section className='font-body bg-light-theme-background dark:bg-dark-theme-background'>
          <nav className="absolute w-screen font-light pr-2 py-2 lg:pr-4 lg:py-4">
            <ul className="lg:hidden flex justify-end text-light-theme-text dark:text-dark-theme-text">
                <li className="px-2 pt-1 text-2xl mr-2">
                  <button onClick={handleThemeSwitch}><BsMoonStarsFill/></button>
                </li>
                <li className='text-4xl'>
                  <IoMenuOutline/>
                </li>
            </ul>
            <ul className="hidden lg:flex justify-end text-light-theme-text dark:text-dark-theme-text">
                <li className="px-2 pt-1 text-2xl">
                  <BsMoonStarsFill onClick={handleThemeSwitch}/>
                </li>
                <ul className='lg:flex xs:pb-0 pb-12'>
                  {
                    Links.map((Link) => (
                      <li key={Link.name} className='ml-8 font-base lg:text-xl'>
                        <a href={Link.link}>{Link.name}</a>
                      </li>
                    ))
                  }
                </ul>
            </ul>
          </nav>
          <div className='snap-y snap-mandatory h-screen w-screen overflow-scroll'>
            {/* Home div */}
            <div className='snap-start w-screen h-screen grid content-between justify-center text-6xl'>
              <div className='text-light-theme-text dark:text-dark-theme-text lg:text-center w-screen grid content-center mt-52 lg:mt-64'>
                <div className= 'font-light text-sm ml-6 lg:text-3xl mb-10 lg:mb-24'>BE CREATIVE</div>
                <div className='font-light text-xl ml-6 lg:text-5xl'>Hello, my name is</div>
                <div className='font-bold text-5xl m-6 lg:text-8xl dark:text-dark-theme-title'>THANT HEIN THWIN</div>
                <div className='font-light text-xl ml-8 lg:text-3xl flex lg:justify-center'>I am a&nbsp;
                 <Typewriter
                    options={{
                      strings: ['Web Developer', 'Teacher', 'Video Editor', 'Guitarist'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </div>
              <div className='w-screen flex justify-center mb-10 text-5xl lg:text-7xl text-light-theme-text dark:text-dark-theme-text'>
                <ul className='flex'>
                  {
                    SocialLinks.map((icons) => (
                      <li key={icons.name} className='ml-2 mr-2'>
                        <a href={icons.links}>{icons.logo}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            {/* About div */}
            <div className='snap-start w-screen h-screen grid content-center lg:flex items-center justify-between text-6xl lg:p-36'>
              <div className='hidden lg:grid lg: w-2/3 mr-20'>
                  <h1 className='text-light-theme-title dark:text-light-theme-green'>About Me</h1>
                  <p className='text-2xl tracking-widest mt-4 leading-relaxed text-light-theme-text dark:text-dark-theme-title'>
                  Started learning about <b>web development</b> back in <b>2017</b>. As an alumni of <br/>
                  <b> MIIT, Myanmar Institute of Information Technology</b>, I got to learn <br/>
                  about those things with strong foundations. Currently studying in <b>MCC </b> <br/>
                  for <b>NCC Level 5 diploma in Computing</b>. Back in <b>2019</b>, me and my friends <br/>
                  won <b>First Prize</b> in a Robotic Competition called <b>Robotian</b> under a team <br/>
                  named <b>Enigma</b>. Currently running a YouTube channel : <b>S for Steve</b>, in <br/>
                  which I upload some cover songs since I love to sing and play guitar. <br/>
                  </p>
                  <p className='text-2xl tracking-widest mt-6 mb-6 text-light-theme-text dark:text-dark-theme-text'>
                  How do I want to describe myself in 3 words?
                  </p>
                  <p className='text-4xl tracking-widest mt-4 font-bold text-light-theme-text dark:text-dark-theme-text'>
                  Creative, Ambitious and Cooperative
                  </p>
              </div>
              <div className='absoulute w-screen lg:w-1/3 pl-12 pr-12 lg:p-0 grid justify-center'>
                {/* About me card */}
                <ReactCardFlip isFlipped={flip} flipDirection='horizontal'>
                  <div className='card grid'  onClick={() => setFlip(!flip)}>
                    <Image src={ProfilePic} alt='Profile Picture' className='rounded-2xl w-[22rem] lg:m-2'/>
                    <div className='grid'>
                    <span className='text-base lg:text-3xl ml-2'> About Me ? </span>
                    <span className='text-xs lg:text-xl mr-2 opacity-70 flex items-center justify-between mx-2'> Flip the card to find out ! <TbArrowBarDown/> </span>
                    </div>
                  </div>
                  <div className='card grid content-center' onClick={() => setFlip(!flip)}>
                    <ul className='text-base lg:text-xl font-bold m-6'>
                      <li className='lg:my-4'>🎓 <br/>Alumini of <u><b><a href='https://www.miit.edu.mm/'>MIIT</a></b></u></li>
                      <li className='lg:my-4'>📖 <br/>Currently studying in <b>MCC</b> for <b>NCC Level 5 Diploma in Computing</b></li>
                      <li className='lg:my-4'>⌨️ <br/>Loves to code</li>
                      <li className='lg:my-4'>💭 <br/>Good at problem solving</li>
                    </ul>
                  </div>
                </ReactCardFlip>
                

                {/* 3 words to describe myself */}
                <div className='card lg:hidden my-10 grid'>
                  <span className='text-base flex justify-center'>3 Words To Describe Myself</span>
                  <ul className='text-2xl font-bold text-center'>
                    <li>Creative</li>
                    <li>Ambitious</li>
                    <li>Cooperative</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Skills div */}
            <div className='snap-start w-screen h-screen flex items-center justify-center text-6xl'>3</div>
            {/* Projects div */}
            <div className='snap-start w-screen h-screen flex items-center justify-center text-6xl'>4</div>
            {/* Contact div */}
            <div className='snap-start w-screen h-screen flex items-center justify-center text-6xl'>5</div>
          </div>
        </section>
      </main>
    </div>
  )
}