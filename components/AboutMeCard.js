import React,{ useState } from 'react'

import Image from 'next/image';
import ProfilePic from '../public/Profile.png';

import { TbArrowBarDown } from 'react-icons/tb';

export default function AboutMeCard({card}) {
    const [ flip, setFlip ] = useState(false);

  return (
    <div 
        className={`card ${flip ? 'flip' : ''}`} 
        onClick={() => setFlip(!flip)}
    >
        <div className='grid front duration-1000'>
            <Image src={ProfilePic} alt='Profile Picture' className='rounded-2xl lg:m-2'/>
            <div className='grid'>
            <span className='text-base lg:text-3xl ml-2'> About Me ? </span>
            <span className='text-xs lg:text-xl mr-2 opacity-70 flex items-center justify-between mx-2'> Flip the card to find out ! <TbArrowBarDown/> </span>
            </div>
        </div>
        <div className='grid back'>
            {/* <ul className='text-center'>
                <li>Alumini of <a href='https://www.miit.edu.mm/'><u><b>MIIT</b></u></a></li>
                <li>Currently studying in <b><u>MCC</u></b> for a <b>Diploma in Computing</b></li>
                <li>Love to code</li>
                <li>Good at problem solving</li>
            </ul> */}
        </div>
        {/* {flip ? card.back : card.front} */}
    </div>
  )
}
