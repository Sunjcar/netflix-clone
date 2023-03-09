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
import { devices } from '../LandingPage/FAQ';
import { NavBar } from '../Navbar';

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
    <SignInPageContainer>
      <PosterBackground mode={"fullscreen"} />
      <NavBar className="signin-page" />
      <SignInContainer>
        <SignInForm>
          <h1>Sign In</h1>

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
        <FormOther>
          <div>
            {"New to Netflix? "}
            <Link to="/">Sign up now.</Link>
          </div>
          <div className="disclaimer">
            <p>
              <span>
                This page is protected by Google reCAPTCHA to ensure you&apos;re
                not a bot.&nbsp;
                <button
                  className={showDisclaimer ? "hide" : ""}
                  onClick={() => setShowDisclaimer(true)}
                >
                  Learn more.
                </button>
              </span>
            </p>
            <div className={showDisclaimer ? "disclaimer-text" : "hide"}>
              <span>
                {
                  "The information collected by Google reCAPTCHA is subject to the Google "
                }
                <a>Privacy Policy</a>
                {" and "}
                <a>Terms of Service</a>
                {
                  ", and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google)."
                }
              </span>
            </div>
          </div>
        </FormOther>
      </SignInContainer>
    </SignInPageContainer>
  );
};

export default SignIn;

export const SignInPageContainer = styled.div`
  height: 100%;
`;

export const SignInContainer = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 60px 68px 40px;
  font-family: "Netflix Sans Light";
  color: white;
  max-width: 450px;
  min-height: 660px;
  margin: 0 auto 0;
  z-index: 10;
  @media ${devices.medium} {
    position: absolute;
    background-color: rgba(0, 0, 0);
    top: 0;
    z-index: 1;
    max-width: 100%;
    min-height: 100%;
  }
`;

export const SignInForm = styled.div`
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

export const RememberMe = styled.div`
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

export const FormOther = styled.div`
  color: #b3b3b3;
  font-size: 16px;
  margin-top: 2rem;
  a {
    text-decoration: none;
    color: white;
  }
  div.disclaimer {
    font-size: 13px;
    button {
      background-color: transparent;
      border: none;
      color: #0071eb;
      cursor: pointer;
      padding: 0;
      &.hide {
        visibility: hidden;
      }
    }
    button:hover {
      text-decoration: underline;
    }
  }
  div.hide {
    opacity: 0;
  }
  div.disclaimer-text {
    opacity: 1;
    a {
      color: #0071eb;
    }
  }
`;

export const BgWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 0;
  &.card {
    width: 100vw;
    height: 692px;
    @media ${devices.large} {
      height: 542px;
    }
    @media ${devices.medium} {
      height: 536px;
    }
    img {
      width: 100%;
    }
  }
  &.fullscreen {
    overflow: hidden;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const BgImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BgMask = styled.div`
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0,
    transparent 60%,
    rgba(0, 0, 0, 0.7)
  );
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

interface PosterBackgroundProps {
  mode: "card" | "fullscreen";
}

const PosterBackground = ({ mode }: PosterBackgroundProps) => {
  return (
    <BgWrapper className={mode}>
      <BgImg src={Background} />
      <BgMask />
    </BgWrapper>
  );
};