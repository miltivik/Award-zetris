import AnimateTitle from './AnimateTitle'
import { useRef } from 'react'
import gsap from 'gsap';
import RoundedCorners from './RoundedCorners'
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';

const Story = () => {
  const frameRef = useRef(null);
  const handleMouseLeave = () => {
    const element = frameRef.current;

    
    gsap.to(element,{
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut',
    })
  }
  const handleMouseMove = (e) => {
    const {clientX, clientY} = e;
    const element = frameRef.current;

    if(!element) return;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * -10;
    const rotateY = ((centerX - x) / centerX) * 10;

    gsap.to(element,{
      duration: 0.5,
      rotateX: rotateX,
      rotateY: rotateY,
      ease: 'power1.inOut',
      transformPerspective: 500,
    })
  }
  
  return (
    <section id className="w-screen bg-black text-blue-50 min-h-dvh">
      <div className="flex flex-col items-center py-10 pb-24 size-full">
          <p className="font-general text-sm uppercase md:text-[10px]">te multiversal ip world</p>
          <div className="relative size-full">
            <AnimateTitle 
            title='The st<b>o</b>ry of<br />a hidden real<b>m</b>'
            sectionid='story'
            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
            />
            <div className='story-img-container'>
              <div className='story-img-mask'>
                <div className='story-img-content'>
                  <img src="img/entrance.webp" onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseDown={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  ref={frameRef} alt="entrance" className='object-contain' />
                </div>
              </div>
              <RoundedCorners />
            </div>
          </div>
          <div className='flex w-full mt-80 justify-normal md:-mt-64 md:me-44 md:justify-end'>
            <div className='flex flex-col items-center h-full w-fit md:items-start '>
              <p className='max-w-sm mt-3 text-center font-circular-web text-violet-50 md:text-start'>Where realms  converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities</p>
              <Button title='discover Prologue' id='realm-button' containerClass='mt-5' rightIcon={<TiLocationArrow />}/>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Story