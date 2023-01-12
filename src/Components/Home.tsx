import Netflix from '../Components/Images/Netflix.png'
import Background from '../Components/Images/Background.jpg'
const Home = () => {
    return (
        <div>
            <header className=' flex justify-between p-8 items-center'>
                <img className='w-[9rem] z-10' src={Netflix} />
                <button className=' text-white bg-[#e50914] px-5 py-2 rounded-[3px] z-10'> Sign In </button>
            </header>
            <div className=' flex-col flex py-[75px] gap-4'>
                <h1 className=' z-10 text-lg text-white mx-auto max-w-[640px] font-[500] text-[3.125rem] text-center leading-none'> Unlimited movies, TV shows and more.</h1>
                <h2 className='z-10 text-white text-center text-[1.5rem]'> Watch anywhere. Cancel anytime.</h2>
            </div>
            <form className=' flex flex-col justify-center items-center gap-4'>
                <h3 className='z-10 text-white text-[1.2rem]'> Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className='flex'>
                    <input className=' z-10 border-[1px] rounded-sm box-border p-4' type='email' placeholder='Email address' />
                    <button className=' z-10 p-4 rounded-sm text-white bg-[#e50914]'> Get Started</button>
                </div>
            </form>
            <div className=' bottom-0 top-0 right-0 left-0 absolute brightness-50'>
                <img className=' h-full object-cover w-full z-0' src={Background} />
            </div>
        </div>
    )
}

export default Home
