import  { useState, useRef, useEffect } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideo, setLoadedVideo] = useState(0);
    
    const totalVideos = 3;
    const nextVdRef = useRef(null);
    const currentVdRef = useRef(null);
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
    const handleMiniVideo = () => {
    setHasClicked(true)
    setCurrentIndex(upcomingVideoIndex)
    }

    {/* loading effect */}
    useEffect(() => {
        if (loadedVideo === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideo]);
  
    useGSAP (() => {
        if (hasClicked) {
        gsap.set('#next-video', {visibility: 'visible'});
        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            
            ease: 'power1.inOut',
            onStart: () => nextVdRef.current.play(),
            
            
        });
        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut',
        })
    }}, {dependencies: [currentIndex], revertOnUpdate: true })

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(10% 0%, 70% 0%, 80% 80%, 0% 100%)',
            borderRadius: '0 0 30% 12.2%',
            
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger:{
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        })
    })

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
    const handleVideoLoaded = () => {
        setLoadedVideo((prevIndex) => prevIndex + 1);
    };

  return (
    <div className="relative w-screen overflow-x-hidden h-dvh">

        {isLoading &&(
            <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-blue-50'>
                <div className='three-body'>
                    <div className='three-body__dot' />
                    <div className='three-body__dot' />
                    <div className='three-body__dot' />
                </div>
            </div>
        )}
        <div id="video-frame" className="relative z-10 w-screen overflow-hidden rounded-lg h-dvh bg-blue-75">
            <div>
                <div className="absolute z-50 overflow-hidden rounded-lg cursor-pointer mask-clip-path absolute-center size-64">
                <div onClick={handleMiniVideo} className='transition-all duration-500 ease-in origin-center scale-50 opacity-0 hover:scale-100 hover:opacity-100'>
                    <video 
                    ref={currentVdRef}
                    src={getVideoSrc(upcomingVideoIndex)}
                    loop
                    muted
                    id="current-video"
                    className='object-cover object-center origin-center scale-150 size-64'
                    onLoadedData={handleVideoLoaded}
                    />
                </div>
                </div>
                
                <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id="next-video"
                className='absolute z-20 invisible object-cover object-center absolute-center size-64'
                onLoadedData={handleVideoLoaded}
                />
                
                <video src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} loop muted 
                autoPlay
                className='absolute top-0 left-0 object-cover object-center size-full ' 
                onLoadedData={handleVideoLoaded}
                /> 
            </div>
            <h1 className='absolute z-40 special-font hero-heading bottom-5 right-5 text-blue-75'>G<b>a</b>ming</h1>
            <div className='absolute top-0 left-0 z-40 size-full'>
                <div className='px-5 mt-24 sm:px-10'>
                    <h1 className='text-blue-100 special-font hero-heading'>redifi<b>n</b>e</h1>
                    <p className='mb-5 text-xl text-blue-100 text max-w-64 font-robert-regular'>Enter the Metagame Layer <br /> Unleash the Play Economy</p>
                    <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1" />
                </div>
            </div>
        </div>
        <h1 className='absolute text-black special-font hero-heading bottom-5 right-5'>G<b>a</b>ming</h1>
    </div>
  )
}

export default Hero
