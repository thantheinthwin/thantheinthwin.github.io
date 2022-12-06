import Head from 'next/head';
import React,{useState, useEffect} from 'react';
import Typewriter from 'typewriter-effect';
import ReactCardFlip from 'react-card-flip';
import FlipText from '../components/FlipText';
import BouncingText from '../components/BouncingText';

import { BsMoonStarsFill } from 'react-icons/bs';
import { Squash as Hamburger } from 'hamburger-react'
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';

import Image from 'next/image';
import ProfilePic from '../public/Profile.png';

import { TbArrowBarDown } from 'react-icons/tb';
import TextShpere from '../components/TextSphere';

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

  // For hamburger menu
  const [isOpen, setOpen] = useState(false);

  const Links = [
    {name: "Home", link: "#home"},
    {name: "About", link: "#about"},
    {name: "Skills", link: "#skills"},
    // {name: "Projects", link: "#projects"},
    {name: "Contact", link: "#contact"},
  ];

  const SocialLinks = [
    {id: 1, name: 'LinkedIn', logo: <AiFillLinkedin/>, links: 'https://www.linkedin.com/in/thanthein/'},
    {id: 2, name: 'Github', logo: <FaGithubSquare/>, links: 'https://github.com/thantheinthwin'},
    {id: 3, name: 'YouTube', logo: <AiFillYoutube/>, links: 'https://www.youtube.com/@sforsteve'},
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
        <script src="https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js"></script>
      </Head>

      <main>
        <section className='font-body bg-light-theme-background dark:bg-dark-theme-background cursor-default'>
          {/* Nav bar */}
          <nav className="absolute z-50 font-light pr-2 py-2 lg:pr-4 lg:py-4 w-screen">
            {/* Nav for mobile view */}
            <ul className="lg:hidden flex justify-end text-light-theme-text dark:text-dark-theme-text">
                <li className="px-2 pt-2 text-3xl mr-2">
                  <button onClick={handleThemeSwitch}><BsMoonStarsFill/></button>
                </li>
                <li className='text-4xl'>
                  <button onClick={showMenu}><Hamburger toggled={isOpen} toggle={setOpen}/></button>
                  <ul className={active ? 'absolute right-0 w-screen h-screen grid content-center text-center bg-light-theme-background dark:bg-dark-theme-background' : 'hidden'}>
                    <ul className='absolute w-screen h-screen top-1/4'>
                      {
                        Links.map((Link) => (
                          <li key={Link.name} className='font-light text-4xl lg:text-xl my-4' 
                              onClick={() => {
                                setActive(!active);
                                setOpen(!isOpen);
                              }}>
                            <a href={Link.link}>{Link.name}</a>
                          </li>
                        ))
                      }
                    </ul>
                    <div className='absolute bottom-[6.7rem] mb-10 text-5xl  text-light-theme-text dark:text-dark-theme-text mt-20 translate-y-11'>
                      <ul className='flex w-screen justify-center'>
                        {
                          SocialLinks.map((icons) => (
                            <li key={icons.name} className='ml-2 mr-2'>
                              <a href={icons.links}>{icons.logo}</a>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </ul>
                </li>
            </ul>
            {/* Nav for desktop view*/}
            <ul className="hidden lg:flex justify-end text-light-theme-text dark:text-dark-theme-text">
                <li className="px-2 pt-1 text-3xl hover:opacity-80 duration-1000">
                  <BsMoonStarsFill onClick={handleThemeSwitch}/>
                </li>
                <ul className='lg:flex xs:pb-0 pb-12'>
                  {
                    Links.map((Link) => (
                      <li key={Link.name} className='navItems'>
                        <a href={Link.link}>{Link.name}</a>
                      </li>
                    ))
                  }
                </ul>
            </ul>
          </nav>
          <div className='relative snap-y snap-mandatory h-screen w-screen overflow-y-scroll overflow-x-hidden'>
            {/* Home div */}
            <div id='home' className='snap-start w-full h-screen justify-center text-6xl'>
              <div className='absolute w-screen text-light-theme-text dark:text-dark-theme-text lg:text-center grid content-center top-1/3'>
                <div className= 'font-light text-sm ml-6 lg:text-3xl mb-10 lg:mb-24'>BE CREATIVE</div>
                <div className='font-light text-xl ml-6 lg:text-5xl'>Hello, my name is</div>
                <div className='font-bold text-5xl m-6 lg:text-8xl dark:text-dark-theme-title lg:flex justify-center'>
                  <div className='hidden lg:flex'>
                  <BouncingText BouncingText={'THANT HEIN THWIN'}></BouncingText>
                  </div>
                  <div className='lg:hidden'>
                    <BouncingText BouncingText={'THANT HEIN'}></BouncingText>
                    <BouncingText BouncingText={'THWIN'}></BouncingText>
                  </div>
                </div>
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
              <div className='absolute w-screen flex justify-center text-5xl bottom-10 lg:text-7xl text-light-theme-text dark:text-dark-theme-text'>
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
            <div id='about' className='snap-start w-screen h-screen grid content-center lg:flex items-center justify-between text-6xl lg:p-36'>
              <div className='hidden lg:grid lg: w-2/3 mr-20 font-light'>
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
                    <span className='text-base lg:text-3xl ml-2 dark:text-light-theme-title'> About Me ? </span>
                    <span className='text-xs lg:text-xl mr-2 opacity-70 flex items-center justify-between mx-2 dark:text-light-theme-text'> Flip the card to find out ! <TbArrowBarDown/> </span>
                    </div>
                  </div>
                  <div className='card grid content-center lg:h-[32rem]' onClick={() => setFlip(!flip)}>
                    <ul className='text-base lg:text-xl font-bold m-6 dark:text-light-theme-text'>
                      <li className='lg:my-4'>🎓 <br/>Alumini of <u><b><a href='https://www.miit.edu.mm/'>MIIT</a></b></u></li>
                      <li className='lg:my-4'>📖 <br/>Currently studying in <b>MCC</b> for <b>NCC Level 5 Diploma in Computing</b></li>
                      <li className='lg:my-4'>⌨️ <br/>Loves to code</li>
                      <li className='lg:my-4'>💭 <br/>Good at problem solving</li>
                    </ul>
                  </div>
                </ReactCardFlip>
                
                {/* 3 words to describe myself */}
                <div className='card lg:hidden my-10 grid'>
                  <span className='text-base flex justify-center dark:text-light-theme-text'>3 Words To Describe Myself</span>
                  <ul className='text-2xl font-bold text-center dark:text-light-theme-title'>
                    <li>Creative</li>
                    <li>Ambitious</li>
                    <li>Cooperative</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Skills div */}
            <div id='skills' className='relative snap-start w-screen h-screen flex items-center justify-center text-6xl'>
              <div className='absolute left-0 hidden w-2/3 h-screen lg:grid content-center text-2xl px-36 font-light tracking-widest text-light-theme-text dark:text-dark-theme-text'>
                  <div>
                    Here are a few technologies I've been recently working with : 
                  </div>
                  <div className='flex justify-evenly my-10'>
                    <div>
                      <ul className='list-disc'>
                        <li className='mb-2'>JavaScript</li>
                        <li className='mb-2'>React</li>
                        <li className='mb-2'>Node.js</li>
                      </ul>
                    </div>
                    <div>
                      <ul className='list-disc'>
                        <li className='mb-2'>Express.js</li>
                        <li className='mb-2'>MongoDB</li>
                        <li className='mb-2'>MySql</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    As for career-wise experience :
                    <ul className='list-disc my-10 ml-10'>
                      <li className='mb-4'>ICT Teacher, IT Support, Graphic Designer and IT consultant in <b>ILBSM International School</b></li>
                      <li className='mb-4'>Quality Assurance Developer in <b>Armor Piercing Indie Games Production</b></li>
                      <li className='mb-4'>Video Translator</li>
                    </ul>
                  </div>
              </div>
              <div className='absolute lg:right-0 w-screen lg:w-1/3 h-screen text-center grid items-center'>
                <div className='mt-8 justify-center w-screen'><TextShpere/></div>
                <div className='card lg:hidden grid mx-10 -mt-20'>
                  <span className='text-2xl flex justify-center dark:text-light-theme-text'>What I've learned till now</span>
                </div>
              </div>
            </div>
            {/* Projects div
            <div id='projects' className='snap-start w-screen h-screen flex items-center justify-center text-6xl'>4</div> */}
            {/* Contact div */}
            <div id='contact' className='snap-start w-screen h-screen flex items-center justify-center text-6xl'>
              <div className='relative w-screen h-screen grid content-between justify-start p-4 text-light-theme-text dark:text-dark-theme-text'>
                <div className='absolute top-1/4 left-[4%]'>
                  <p className='font-light text-xl lg:text-4xl'>I'm always interested in working as</p>
                  <ul className='text-2xl mt-12 text-light-theme-title dark:text-dark-theme-title lg:hidden'>
                    <li><div className='border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2'>Front-end Web Developer</div></li>
                    <li><div className='border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2'>Junior Programmer</div></li>
                    <li><div className='border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2'>Graphic Designer</div></li>
                    <li><div className='border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2'>Game Development</div></li>
                  </ul>
                  <div className='hidden relative w-screen h-96 p-6 lg:flex'>
                    <div className='absolute border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2 lg:text-4xl top-[30%] right-[50%]'>Front-end Web Developer</div>
                    <div className='absolute border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2 lg:text-4xl top-[30%] right-[32%]'>Junior Programmer</div>
                    <div className='absolute border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2 lg:text-4xl top-[53%] right-[48%]'>Graphic Designer</div>
                    <div className='absolute border-solid border-2 border-light-theme-title dark:border-dark-theme-title rounded-2xl p-1 w-fit mb-2 lg:text-4xl top-[53%] right-[30%]'>Game Development</div>
                  </div>
                </div>
                <div className='absolute bottom-0 w-screen h-72 p-2'>
                  <span className='absolute text-6xl lg:text-9xl bottom-0 lg:bottom-5 lg:left-12'>
                    <FlipText FlipText={"LET'S"}></FlipText>
                    <FlipText FlipText={"CONNECT"}></FlipText>
                  </span>
                  <div className='absolute bottom-[4.5rem] right-4 border-b-4 lg:hidden border-light-theme-title dark:border-dark-theme-title pb-1'>
                    <ul className='flex'>
                      {
                        SocialLinks.map((icons) => (
                          <li key={icons.id} className='ml-4 text-5xl'>
                            <a href={icons.links}>{icons.logo}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className='absolute bottom-[4.5rem] right-4 border-t-4 hidden lg:flex border-light-theme-title dark:border-dark-theme-title pb-1'>
                    <ul className='flex mt-4'>
                      {
                        SocialLinks.map((links) => (
                          <li key={links.id} className='socialLinks'>
                            <a href={links.links}>{links.name}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}