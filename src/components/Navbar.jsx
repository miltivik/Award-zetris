import { useRef, useState, useEffect } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import Buttom from './Button';
import { useWindowScroll } from 'react-use';
import gsap from "gsap";


const navItems = ['Nexus', 'Vault', 'About', 'Contact'];
const Navbar = () => {
    const navContainterRef = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isnavVisible, setIsNavVisible] = useState(true)

    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY == 0) {
            setIsNavVisible(true);
            navContainterRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainterRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainterRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainterRef.current, {
            opacity: isnavVisible ? 1 : 0,
            y: isnavVisible ? 0 : -100,
            duration: 0.2,
        })
    }, [isnavVisible])

    const audioElementRef = useRef(null);
    const toggleAudioIndicator = () => {
        setIsAudioPlaying(prev => !prev);
        setIsIndicatorActive(prev => !prev);
    }
    useEffect(() => {
    if (isAudioPlaying) {
        audioElementRef.current.play();
    } else {
        audioElementRef.current.pause();
    }
    
    return () => {
        null;
    }
    }, [isAudioPlaying])
    

return (
    
    <div ref={navContainterRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-500 sm:inset-x-6 '>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                <div className='flex items-center gap-7'>
                    <img src="/img/logo.png" alt="logo" className='w-10' />
                    <Buttom id='product-button' title='product' rightIcon={<TiLocationArrow/>} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" />
                </div>
                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                    {navItems.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>{item}</a>
                    ))}
                    </div>
                    <div>

                        <button onClick={toggleAudioIndicator} className='ml-10 flex items-center space-x-0.5'>
                            <audio ref={audioElementRef} src="/audio/loop.mp3" loop className='hidden'/>

                            {[1,2,3,4].map((bar) => (
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{
                                    animationDelay: `${bar * 0.1}s`
                                }} />
                            ))}
                            
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    </div>
)
}

export default Navbar