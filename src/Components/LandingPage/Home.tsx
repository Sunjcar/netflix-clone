import Netflix from '../LandingPage/Images/Netflix.png';
import Background from '../LandingPage/Images/Background.jpg';
import TV from '../LandingPage/Images/TV.png';
import Video from '../LandingPage/Images/video-tv.m4v';
import Device from '../LandingPage/Images/Devices.png';
import DeviceVid from '../LandingPage/Images/video-device.m4v';
import Kids from '../LandingPage/Images/Kids.png';
import Phone from '../LandingPage/Images/Phone.jpeg';
import StrangerThings from '../LandingPage/Images/strangerthings.png';
import gif from '../LandingPage/Images/downloadgif.gif';
import { FAQ } from './FAQ';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, useTextField } from '../SignInPage/types';
import { useStateValue } from '../State';
import { userService } from '../../Services/UserService';
import { setAccount } from '../State/reducer';
import { FormEvent } from 'react';

const Home = () => {
    const email = useTextField("Email address", "landing", "account");
    const [, dispatch] = useStateValue();
    const navigate = useNavigate();

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();
        if (email.value === "") return email.handleEmptySubmit();
        if (email.errMsg !== "") return;

        const userExist = await userService.checkUser(email.value);
        dispatch(setAccount(email.value));
        if (userExist) navigate("/login");
        else navigate("/sign-up");
        window.scrollTo(0, 0);
    };
    return (
        <div className='w-[100vw] '>
            <div className='flex flex-col border-b-8 border-solid border-[rgb(50,50,50)]'>
                <header className='z-10 flex items-center justify-between p-8 '>
                    <img className='w-[9rem] z-10' src={Netflix} />
                    <Link to='sign-in'>
                        <button className=' text-white bg-[#e50914] px-5 py-2 rounded-[3px] z-10'> Sign In </button>
                    </Link>
                </header>
                <div className=' flex-col flex py-[70px] px-[45px] gap-4'>
                    <h1 className=' z-10 text-lg text-white mx-auto max-w-[640px] font-[500] text-[3.125rem] text-center leading-none'> Unlimited movies, TV shows and more.</h1>
                    <h2 className='z-10 text-white text-center text-[1.125rem] lg:text-[2rem] my-[1rem]'> Watch anywhere. Cancel anytime.</h2>
                    <form className='flex flex-col items-center justify-center gap-2 ' onSubmit={handleSignUp}>
                        <h3 className='z-10 text-white text-[1.125] lg:text-[1.425rem] px-[10%] text-center'> Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className='flex flex-col items-center lg:flex-row'>
                            <div className='mt-[10px] lg:mt-0 z-10 '>
                                <div>
                                    <div className='relative '>
                                        <TextField {...email}/>
                                    </div>
                                </div>
                            </div>
                            <button className=' z-10 p-[12px] rounded-sm text-white bg-[#e50914] lg:mt-0 mt-[10px] hover:bg-red-500'> Get Started</button>
                        </div>
                    </form>
                </div>
                <div className='absolute top-0 bottom-0 left-0 right-0 brightness-50 h-[720px] lg:h-[692px]'>
                    <img className='z-0 object-cover w-full h-full ' src={Background} />
                </div>
            </div>
            <div className=' flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-t-8 border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col '>
                <div className='flex flex-col items-center justify-center lg:items-center lg:justify-center lg:flex-row w-[1100px]'>
                    <div>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Enjoy on your TV.</h1>
                        <h2 className=' text-[1.625rem] max-w-[800px] font-sans font-[100]'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                    <div className='relative box-border flex flex-auto h-full w-[350px] lg:w-[450px] flex-col items-center justify-between lg:flex-row'>
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
                <div className='flex flex-col items-center justify-center lg:flex-row w-[1100px]'>
                    <div className='relative box-border flex flex-auto h-full w-[350px] lg:w-[450px] flex-col items-center justify-between lg:flex-row'>
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
                <div className='flex flex-col items-center justify-center lg:flex-row w-[1100px]'>
                    <div className='relative mx-auto width-full'>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Create profiles for kids.</h1>
                        <h2 className='  text-[1.625rem] max-w-[600px] font-sans font-[100]'>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</h2>
                    </div>

                    <img className='relative z-10' alt='tv' src={Kids} />

                </div>
            </div>
            <div className=' flex relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className='flex flex-col items-center justify-between lg:flex-row w-[1100px]'>
                    <div className='box-border relative flex flex-auto '>
                        <img className='relative z-10 h-auto max-w-full' alt='devices' src={Phone} />
                        <div className=' translate-x-[-50%] rounded-xl flex absolute px-[.5em] py-[.75em] items-center bg-[rgb(0,0,0)] border-solid z-10 border-2 border-[rgb(255,255,255,0.25)] w-[60%] bottom-[5%] left-[50%] '>
                            <img alt='Stranger Things' src={StrangerThings} className=' h-[4.5em] mr-[1em]' />
                            <div className='flex-1 '>
                                <h1 className=' text-[1rem]'>Stranger Things</h1>
                                <h2 className=' text-[.9rem] text-[#0071eb] '>Downloading...</h2>
                            </div>
                            <img alt='download gif' src={gif} className='h-[3.5em]' />
                        </div>
                    </div>
                    <div className=' py-[75px]'>
                        <h1 className='font-sans text-[3.725rem] leading-none max-w-[500px] font-extrabold '>Download your shows to watch offline.</h1>
                        <h2 className=' text-[1.625rem] max-w-[600px] font-sans font-[100]'>Available on all plans except Basic with ads.</h2>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col relative items-center bg-black w-full py-[70px] px-[45px] text-white box-border border-b-8 border-solid border-[rgb(50,50,50)] justify-between xl:flex-col'>
                <div className=' relative mx-auto py-[70px] w-full'>
                    <h1 className='text-[3rem] text-center'> Frequently Asked Questions </h1>
                    <FAQ />
                    <form className='flex flex-col items-center justify-center'>
                        <h3 className=' text-center px-[10%]'> Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className='flex flex-col items-center lg:flex-row'>
                            <div className='mt-[10px]'>
                                <div className='relative'>
                                    <label>
                                        <input className='  h-[48px] w-full sm:w-[22rem] md:w-[28rem] lg:w-[34rem] px-[10px] pt-[10px] shadow-none border-solid border-[#8c8c8c] border-[1px] rounded-[2px] box-border text-black text-[16px] peer ' placeholder=' '></input>
                                        <label className=' text-[#8c8c8c] pointer-events-none text-[14px] absolute duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'> Email address</label>
                                    </label>
                                </div>
                            </div>
                            <button className='inline-flex gap-2 h-[48px] items-center text-white bg-[#e50914] hover:bg-red-500 mt-[10px] px-[1em] p-4 rounded-sm w-auto'>
                                <span> Get Started </span>
                                <span><IoIosArrowForward /> </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
