import { useState, useRef} from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const BentTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!itemRef.current) return;
        
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 10;
        const tiltY = (relativeX - 0.5) * -10;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95,0.95, 0.95)`;

        setTransformStyle(newTransform);
    }

    const handleMouseLeave = () => {
        setTransformStyle('');
    }
    return (
        <h1 ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} 
        style={{
        transform: transformStyle    
        }} 
        className={className}>{children}</h1>
    )
}
const BentoCard = ({ src, title, description, isComingSoon }) => {
    return (
        <div className="relative size-full ">
            <video src={src} loop muted autoPlay className="absolute top-0 left-0 object-cover object-center size-full"/>
            <div className="relative z-10 flex flex-col justify-between p-5 size-full text-blue-50">
            <div>
                <h1 className="bento-title special-font">{title}</h1>
                {description &&(
                    <p className="text-lg bento-description font-circular-web">{description}</p>
                )}
            </div>
            </div>
        </div>
    )
}
const Features = () => {
  return (
    <section className="bg-black pb-52">
        <div className="px-3 mx-auto continer md:px-10">
            <div className="px-5 py-32">
                <p className="text-2xl font-circular-web text-blue-50">Into the Metagame Layer</p>
            
            <p className="max-w-md text-lg opacity-50 font-circular-web text-blue-50">
                Inmerse yourself in a rich and ever-expanding universe where a vibrant array of products converge into an interconnected overlay experience on your world
            </p>
        </div>
        
        <BentTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-65[vh]">
        <BentoCard src="videos/feature-1.mp4"
            title={ <>radia<b>n</b>t</>}
            description='The Game of Games begins-your life, now an epic MMORPG'
            isComingSoon={true}
        />
        </BentTilt>
            <div className="grid h-[135vh] grid-cols-3 grid-rows-3 gap-7 ">
                <BentTilt className="row-span-1 bento-tilt_1 md:col-span-1 md:row-span-2">
                    <BentoCard src="videos/feature-2.mp4"
                        title={ <>zigma</>}
                        description='The Metagame Layer is the new frontier of the digital world'
                    />
                </BentTilt>
                <BentTilt className="row-span-1 bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard src="videos/feature-3.mp4"
                        title={ <>metagame</>}
                        description='The Metagame Layer is the new world of the digital world and with his magic you can do anything'
                    />
                </BentTilt>
                <BentTilt className="row-span-1 bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard src="videos/feature-4.mp4"
                        title={ <>az<b>u</b>l</>}
                        description='A cross-world AI Agent - elevating your gameplay to be more fun and productive.'
                    />
                </BentTilt>
                <BentTilt className="bento-tilt_2">
                    <div className="flex justify-between p-5 size-full flex-cul bg-violet-300">
                        <h1 className="text-black bento-title special-font max-64">M<b>o</b>re Co<b>m</b>ing S<b>o</b>on!</h1>
                        <TiLocationArrow className='m-5 scale-[5] self-end' />
                    </div>
                </BentTilt>
                <BentTilt className='bento-title_2'>
                    <video src="/videos/feature-5.mp4" loop muted autoPlay className="object-cover object-center size-full"></video>
                </BentTilt>
                <div>
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features