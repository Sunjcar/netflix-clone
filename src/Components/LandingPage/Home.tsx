import Netflix from '../LandingPage/Images/Netflix.png'
import Background from '../LandingPage/Images/Background.jpg'
import TV from '../LandingPage/Images/TV.png'
import Video from '../LandingPage/Images/video-tv.m4v'
import Device from '../LandingPage/Images/Devices.png'
import DeviceVid from '../LandingPage/Images/video-device.m4v'
import Kids from '../LandingPage/Images/Kids.png'
import Phone from '../LandingPage/Images/Phone.jpeg'
import StrangerThings from '../LandingPage/Images/strangerthings.png'
import gif from '../LandingPage/Images/downloadgif.gif'
import { FAQ } from './FAQ'

const Home = () => {
    return (
        <div>
            <div className='flex flex-col border-b-8 border-solid border-[rgb(50,50,50)] h-[700px]'>
                <header className='flex items-center justify-between p-8 '>
                    <img className='w-[9rem] z-10' src={Netflix} />
                    <button className=' text-white bg-[#e50914] px-5 py-2 rounded-[3px] z-10'> Sign In </button>
                </header>
                <div className=' flex-col flex py-[70px] px-[45px] gap-4'>
                    <h1 className=' z-10 text-lg text-white mx-auto max-w-[640px] font-[500] text-[3.125rem] text-center leading-none'> Unlimited movies, TV shows and more.</h1>
                    <h2 className='z-10 text-white text-center text-[1.5rem]'> Watch anywhere. Cancel anytime.</h2>
                </div>
                <form className='flex flex-col items-center justify-center gap-4 '>
                    <h3 className='z-10 text-white text-[1.2rem]'> Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className='flex'>
                        <input className=' z-10 border-[1px] rounded-sm box-border p-4' type='email' placeholder='Email address' />
                        <button className=' z-10 p-4 rounded-sm text-white bg-[#e50914]'> Get Started</button>
                    </div>
                </form>
                <div className='absolute top-0 bottom-0 left-0 right-0 brightness-50 h-[692px]'>
                    <img className='z-0 object-cover w-full h-full ' src={Background} />
                </div>
            </div>
            <div className=' flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col '>
                <div className='flex flex-col items-center justify-center lg:items-center lg:justify-center lg:flex-row max-w-[1100px]'>
                    <div>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Enjoy on your TV.</h1>
                        <h2 className=' text-[1.625rem] max-w-[800px] font-sans font-[100]'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                    <div className='relative box-border flex flex-auto h-full w-[450px] flex-col items-center justify-between lg:flex-row'>
                        <img className='relative z-10' alt='tv' src={TV} />
                        <div className='flex absolute max-h-[65%] max-w-[73%] top-[21%] left-[13%]'>
                            <video className='w-full overflow-clip' autoPlay playsInline loop muted>
                                <source type='video/mp4' src={Video} />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className='flex flex-col items-center justify-center lg:flex-row max-w-[1100px]'>
                    <div className='relative box-border flex flex-auto h-full w-[450px] flex-col items-center justify-between lg:flex-row'>
                        <img className='relative z-10' alt='devices' src={Device} />
                        <div className='flex absolute max-h-[46%] max-w-[70%] overflow-hidden top-[11%] left-[14.5%]'>
                            <video className='w-full overflow-clip' autoPlay playsInline loop muted>
                                <source type='video/mp4' src={DeviceVid} />
                            </video>

                        </div>
                    </div>
                    <div className='relative mx-auto width-full'>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Watch everywhere.</h1>
                        <h2 className=' text-[1.625rem] max-w-[600px] font-sans font-[100]'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h2>
                    </div>
                </div>
            </div>
            <div className=' flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className='flex flex-col items-center justify-center lg:flex-row max-w-[1100px]'>
                    <div className='relative mx-auto width-full'>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Create profiles for kids.</h1>
                        <h2 className='  text-[1.625rem] max-w-[600px] font-sans font-[100]'>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</h2>
                    </div>

                    <img className='relative z-10' alt='tv' src={Kids} />

                </div>
            </div>
            <div className=' flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className='flex flex-col items-center justify-between lg:flex-row'>
                    <div className='box-border relative flex flex-auto '>
                        <img className='relative z-10' alt='devices' src={Phone} />
                        <div className=' translate-x-[-50%] rounded-xl flex absolute px-[.5em] py-[.75em] items-center bg-[rgb(0,0,0)] border-solid z-10 border-2 border-[rgb(255,255,255,0.25)] w-[60%] bottom-[5%] left-[50%] '>
                            <img alt='Stranger Things' src={StrangerThings} className=' h-[4.5em] mr-[1em]' />
                            <div className='flex-1 '>
                                <h1 className=' text-[1rem]'>Stranger Things</h1>
                                <h2 className=' text-[.9rem] text-[#0071eb] '>Downloading...</h2>
                            </div>
                            <img alt='download gif' src={gif} className='h-[3.5em]' />
                        </div>
                    </div>
                    <div >
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Download your shows to watch offline.</h1>
                        <h2 className=' text-[1.625rem] max-w-[600px] font-sans font-[100]'>Available on all plans except Basic with ads.</h2>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className=' relative mx-auto py-[70px] w-full'>
                    <h1 className='text-[3rem] text-center'> Frequently Asked Questions </h1>
                    <FAQ/>
                </div>
            </div>
        </div>
    )
}

export default Home
