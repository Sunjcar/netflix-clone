import Netflix from '../LandingPage/Images/Netflix.png';
import Background from '../LandingPage/Images/Background.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStateValue } from '../State';
import { RedButton, TextField, useTextField } from './types';
import { userService } from '../../Services/UserService';
import { signIn } from '../utils/helpers';
import { setUser } from '../State/reducer';
import styled from 'styled-components';
const SignIn = () => {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [, dispatch] = useStateValue();
  const [errMsg, setErrMsg] = useState<string>("");
  const username = useTextField("Email or phone number", "signin", "account");
  const password = useTextField("Password", "signin", "password");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.errMsg || password.errMsg) return;
    if (!username.value || !password.value) {
      username.handleEmptySubmit();
      password.handleEmptySubmit();
      return;
    }

    try {
      const user = await userService.login({
        username: username.value,
        password: password.value,
      });
      signIn(user);
      dispatch(setUser(user));
      setErrMsg("");
      navigate("/browse");
    } catch (err) {
      setErrMsg("Wrong credentials");
      password.value = "";
    }
  };
  return (
    <div className='w-[100vw] h-[100vh]'>
      <header className='z-10 flex items-center justify-between p-8 '>
        <Link to='/' className='z-10'>
          <img className='w-[9rem] z-10' src={Netflix} />
        </Link>
      </header>
      <section className='relative rounded-lg bg-[rgba(0,0,0,0.7)] flex box-border flex-col px-[60px] pt-[68px] pb-[40px] text-white max-w-[450px] min-h-[660px] mx-auto z-10 '>
      <SignInForm>
          <h1 className='mb-5 text-3xl'>Sign In</h1>

          {errMsg !== "" ? <div className="error-message">{errMsg}</div> : null}
          <form>
            <TextField {...username} />
            <TextField {...password} />

            <RedButton onClick={handleLogin} className="signin">
              Sign In
            </RedButton>
            <div className="login-help">
              <RememberMe>
                <input type="checkbox" id="remember-me"></input>
                <label htmlFor="remember-me">
                  <span className="remember-me-text">Remember me</span>
                </label>
              </RememberMe>

              <a>Need help?</a>
            </div>
          </form>
        </SignInForm>
        <div className=''>
          <div className=' mt-[2rem] text-[16px] text-[#8c8c8c] flex gap-2'>
            New to Netflix?
            <Link to='/sign-up'>
              <div className='text-white '> Sign up Now </div>
            </Link>
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
  );
};

export default SignIn;

const SignInForm = styled.div`
  input {
    line-height: 25px;
  }
  button {
    border-radius: 4px;
    font-size: 16px;
    margin: 24px 0 12px;
    padding: 16px;
    height: auto;
  }
  div.login-help {
    display: flex;
    font-size: 13px;
    color: #b3b3b3;
  }
  div.error-message {
    padding: 10px 20px;
    color: white;
    background-color: #e87c03;
    font-size: 14px;
    margin: 0 0 16px;
    border-radius: 4px;
  }
`;

const RememberMe = styled.div`
  position: relative;
  flex: 1 0 auto;
  padding-left: 20px;
  input {
    position: absolute;
    opacity: 0;
    left: 1px;
  }
  input[type="checkbox"]:checked + label:after {
    content: "\u2713";
    font-weight: 900;
    color: #000;
    position: absolute;
    left: 3px;
  }
  label:before {
    content: "";
    position: absolute;
    background: #737373;
    border: 0;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    left: 1px;
    top: -1px;
  }
`;