import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import AnimateTitle from "./AnimateTitle";

gsap.registerPlugin(ScrollTrigger)
const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: .5,
                pin: true,
                pintSpacing: true,
            }
        })
        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
        })
    })

  return (
    <div id='about' className='w-screen min-h-screen overflow-x-hidden bg-blue-50'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[30px]'>Welcome to Zentry</h2>
        <AnimateTitle title="Disc<b>o</b>ver the Worlds <br /> l<b>a</b>rgest shared adventure" containerClass="mt-5 !text-black text-center" />
        <div className='about-subtext'>
        <p>The Game of Games begins-your life, now an epic MMORPG</p>
        <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>
      <div className='h-dvh w-screen' id='clip'>
        <div className='mask-clip-path about-image'>
            <img src="img/about.webp" alt="background" className='absolute left-0 top-0 size-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default About
