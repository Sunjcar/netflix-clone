import Netflix from '../LandingPage/Images/Netflix.png'
import Background from '../LandingPage/Images/Background.jpg'
const SignIn = () => {
  return (
    <div className='w-[100vw] h-[100vh]'>
      <header className='z-10 flex items-center justify-between p-8 '>
        <img className='w-[9rem] z-10' src={Netflix} />
      </header>
      <section className='relative rounded-lg bg-[rgba(0,0,0,0.7)] flex box-border flex-col px-[60px] pt-[68px] pb-[40px] text-white max-w-[450px] min-h-[660px] mx-auto z-10 '>
        <div>
          <h1 className=' text-[2em] py-[.67em]'> Sign In </h1>
          <form>
            <div className='relative flex flex-col pb-[16px]'>
              <input type='email' className=' leading-5 rounded-sm bg-[rgb(51,51,51)] text-white px-[16px] pt-[24px] pb-1 peer' />
              <label className=' text-[#8c8c8c] text-[14px] absolute transform peer-focus:-translate-y-8 peer-focus:scale-90 left-[10px] top-[50%] translate-y-[-80%] transition-[ease,top.1s]'> Email or Phone Number</label>
            </div>
            <div className='relative flex flex-col pb-[16px]'>
              <input type='password' className=' leading-5 rounded-sm bg-[rgb(51,51,51)] text-white px-[16px] pt-[24px] pb-1 peer' />
              <label className=' text-[#8c8c8c] text-[14px] absolute transform peer-focus:-translate-y-8 peer-focus:scale-90 left-[10px] top-[50%] translate-y-[-80%] transition-[ease,top.1s]'> Password</label>
            </div>
            <button className='z-10 p-[12px] rounded-sm text-white bg-[#e50914] mt-[24px] mb-[12px] hover:bg-red-500 w-full text-[1rem]'>
              Sign In
            </button>
            <div className='flex justify-between'>
              <div>
                <input className='text-[#8c8c8c]-[#8c8c8c]' type='checkbox'/>
                <label className='text-[#8c8c8c]'> Remember me </label>
              </div>
              <a className='text-[#8c8c8c]'> Need Help? </a>
            </div>
          </form>
        </div>
        <div className=''>
        <div className=' mt-[2rem] text-[16px] text-[#8c8c8c]'>
          New to Netflix?
          <a href='#/' className='text-white '> Sign up Now </a>
        </div>
        <div className=' mt-[1rem]'>
          <p>
            <span className='text-[12px] text-[#8c8c8c]'>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
              <button className='text-blue-600 ml-[2px]'> Learn More </button>
            </span>
          </p>
        </div>
      </div>
      </section>
      <div className=' absolute top-0 bottom-0 left-0 right-0 brightness-50 h-[720px] lg:h-[692px]'>
        <img className='z-0 object-cover w-full lg:h-[100vh] min-h-[114vh] ' src={Background} />
      </div>
    </div>
  )
}

export default SignIn
