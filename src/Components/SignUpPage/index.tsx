import { Link } from 'react-router-dom'
import Netflix from '../LandingPage/Images/Netflix.png'

const SignUp = () => {
    return (
        <div className='w-[100vw] h-[100vh]'>
            <header className='z-10 flex items-center justify-between p-8 '>
                <img className='w-[9rem] z-10' src={Netflix} />
                <Link to='sign-in'>
                    <button className='z-10 px-5 py-2 text-xl text-black font-[500] '> Sign In </button>
                </Link>
            </header>
            <hr></hr>
            <section className='relative rounded-lg flex box-border flex-col px-[60px] pt-[68px] pb-[40px] text-white max-w-[500px] min-h-[660px] mx-auto z-10 '>
                <div>
                    <h1 className='text-black text-[1.8em] font-[400] mt-[.67em] w-full'>Create a password to start your membership</h1>
                    <h3 className='text-black'>Just a few more steps and you're done!</h3>
                    <h3 className='text-black'> We hate paperwork, too </h3>
                </div>
                <div>
                    <form>
                        <div className='relative flex flex-col pb-[16px] mt-[10px]'>
                            <input type='email' className=' leading-5 rounded-sm border-[#8c8c8c] border-[1px] text-black px-[16px] pt-[24px] pb-1 peer' placeholder=" " />
                            <label className=' text-[#8c8c8c] pointer-events-none text-[14px] absolute duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'> Email or Phone Number</label>
                        </div>
                        <div className='relative flex flex-col pb-[16px]'>
                            <input type='password' className=' leading-5 rounded-sm border-[#8c8c8c] border-[1px] text-black px-[16px] pt-[24px] pb-1 peer' placeholder=' ' />
                            <label className=' text-[#8c8c8c] pointer-events-none text-[14px] absolute duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'> Password</label>
                        </div>
                        <button className='z-10 p-[12px] rounded-sm text-white bg-[#e50914] mt-[6px] mb-[12px] hover:bg-red-500 w-full text-[1rem]'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignUp


