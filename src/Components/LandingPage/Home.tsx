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
import { devices, FAQ } from './FAQ';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { /* FormInput, RedButton,  */TextField, useTextField } from '../SignInPage/types';
import { useStateValue } from '../State';
import { userService } from '../../Services/UserService';
import { setAccount } from '../State/reducer';
import { FormEvent } from 'react';
import styled from "styled-components";
import { NavBar, SignIn } from '../Navbar';



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
        if (userExist) navigate("/sign-in");
        else navigate("/sign-up");
        window.scrollTo(0, 0);
    };
    return (
        <>
        <FrontPageContainer>
          <HeaderCard>
            <NavBar className="landing-page">
              <div className="signin">
                <SignIn to="/login">Sign In</SignIn>
              </div>
            </NavBar>
            <OurStoryCard>
              <CardText>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <SignUpForm onSubmit={handleSignUp}>
                  <h3>
                    Ready to watch? Enter your email to create or restart your
                    membership.
                  </h3>
                  <FormInput>
                    <TextField {...email} />
                    <div>
                      <RedButton>Get Started &gt;</RedButton>
                    </div>
                  </FormInput>
                </SignUpForm>
              </CardText>
            </OurStoryCard>
            <PosterBackground mode={"card"} />
          </HeaderCard>
          <OurStoryCard>
            <AnimationCard>
              <CardText>
                <h1>Enjoy on your TV.</h1>
                <h2>
                  Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                  Blu-ray players, and more.
                </h2>
              </CardText>
              <CardImgContainer>
                <img className="right" src={TV} />
                <CardAnimation1>
                  <video autoPlay playsInline muted loop>
                    <source src={Video} type="video/mp4" />
                  </video>
                </CardAnimation1>
              </CardImgContainer>
            </AnimationCard>
          </OurStoryCard>
          <OurStoryCard>
            <AnimationCard className="reverse">
              <CardText>
                <h1>Download your shows to watch offline.</h1>
                <h2>
                  Save your favorites easily and always have something to watch.
                </h2>
              </CardText>
              <CardImgContainer>
                <img className="left" src={Phone} />
                <DownloadAnimation>
                  <img src={StrangerThings} />
                  <div className="title">
                    <div className="text1">Stranger Things</div>
                    <div className="text2">Downloading...</div>
                  </div>
                  <div className="gif" />
                </DownloadAnimation>
              </CardImgContainer>
            </AnimationCard>
          </OurStoryCard>
          <OurStoryCard>
            <AnimationCard>
              <CardText>
                <h1>Watch everywhere.</h1>
                <h2>
                  Steam unlimited movies and TV shows on your phone, tablet,
                  laptop, and TV without paying more.
                </h2>
              </CardText>
              <CardImgContainer>
                <img className="right" src={Device} />
                <CardAnimation2>
                  <video autoPlay playsInline muted loop>
                    <source src={DeviceVid} type="video/mp4" />
                  </video>
                </CardAnimation2>
              </CardImgContainer>
            </AnimationCard>
          </OurStoryCard>
          <OurStoryCard>
            <AnimationCard className="reverse">
              <CardText>
                <h1>Create profiles for kids.</h1>
                <h2>
                  Send kids on adventures with their favorite characters in a
                  space made just for them—free with your membership.
                </h2>
              </CardText>
              <CardImgContainer>
                <img className="left" src={Kids} />
              </CardImgContainer>
            </AnimationCard>
          </OurStoryCard>
          <OurStoryCard className="faq">
            <CardText>
              <h1 className="title-only">Frequently Asked Questions</h1>
              <FAQ />
              <SignUpForm onSubmit={handleSignUp}>
                <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </h3>
                <FormInput>
                  <TextField {...email} />
                  <div>
                    <RedButton>Get Started &gt;</RedButton>
                  </div>
                </FormInput>
              </SignUpForm>
            </CardText>
          </OurStoryCard>
        </FrontPageContainer>
      </>
    );
  };

export default Home;


export const FrontPageContainer = styled.div`
  position: relative;
  width: 100%;
  font-family: "Netflix Sans Light";
  overflow: hidden;
`;

export const HeaderCard = styled.div`
  max-height: 700px;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media ${devices.large} {
    height: 550px;
  }
`;

export const OurStoryCard = styled.div`
  width: 100%;
  padding: 70px 45px;
  background: black;
  color: white;
  box-sizing: border-box;
  border-bottom: 8px solid #323232;
  @media ${devices.large} {
    padding: 65px 40px;
    min-height: 478px;
  }
  @media ${devices.medium} {
    padding: 35px 20px;
    &.faq {
      padding: 35px 0px;
    }
  }
`;

export const AnimationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  max-width: 1100px;
  margin: 0 auto;
  &.reverse {
    flex-direction: row-reverse;
  }
  @media ${devices.large} {
    max-width: 100%;
    flex-direction: column;
    text-align: center;
    &.reverse {
      flex-direction: column;
    }
  }
`;

export const CardImgContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  height: 100%;
  width: 450px;
  img.right {
    margin: -5% 0 0% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }
  img.left {
    margin: -7% 0 -5% 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }
  @media ${devices.medium} {
    width: 350px;
  }
`;

export const CardText = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 75px 0;
  width: 100% !important;
  z-index: 10;
  h1 {
    font-family: "Netflix Sans";
    font-size: 3.725rem;
    line-height: 1.1;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
  h2 {
    margin: 1rem auto;
    font-size: 1.625rem;
    max-width: 800px;
    font-weight: 100;
  }
  h1.title-only {
    text-align: center;
    font-size: 3rem;
  }
  @media ${devices.large} {
    padding: 20px 0;
    h1 {
      font-size: 2.25rem;
      line-height: 1.1;
      margin: 0 auto;
    }
    h2 {
      margin: 1rem auto;
      font-size: 1.5rem;
    }
    h1.title-only {
      font-size: 1.725rem;
    }
  }
  @media ${devices.medium} {
    padding: 10px 0;
    h1 {
      font-size: 1.75rem;
      line-height: 1.1;
      margin: 0 auto;
    }
    h2 {
      margin: 0.75rem auto;
      font-size: 1rem;
    }
    h1.title-only {
      font-size: 1.25rem;
    }
  }
`;

export const CardAnimation1 = styled.div`
  display: flex;
  position: absolute;
  max-height: 66%;
  max-width: 75%;
  overflow: hidden;
  top: 15%;
  left: 15%;
  video {
    width: 100%;
  }
`;

export const CardAnimation2 = styled(CardAnimation1)`
  max-height: 50%;
  max-width: 100%;
  top: 7%;
  left: 0%;
`;

export const DownloadAnimation = styled.div`
  padding: 0.5em 0.75em;
  display: flex;
  align-items: center;
  background: #000;
  border: 2px solid hsla(0, 0%, 100%, 0.25);
  border-radius: 0.75em;
  position: absolute;
  z-index: 10;
  width: 60%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  img {
    margin: 0 1em 0 0;
    height: 4.5em;
  }
  div.title {
    flex: 1;
  }
  div.text1 {
    font-size: 1rem;
  }
  div.text2 {
    font-size: 0.9rem;
    color: #0071eb;
  }
  div.gif {
    height: 3em;
    background: url(${gif}) 50% no-repeat;
    background-size: 100%;
    width: 3em;
  }
`;

export const SignUpForm = styled.form`
  margin: 30px auto 0;
  text-align: center;
  max-width: 900px;
  h3 {
    margin: 0 auto;
    padding: 0 5% 20px 5%;
  }
`;

export const FormInput = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 80%;
  color:black;
  @media ${devices.large} {
    flex-direction: column;
  }
  @media ${devices.medium} {
    max-width: 100%;
    padding: 0 5%;
  }
`;

export const RedButton = styled.button`
  background-color: rgb(229, 9, 20);
  background-image: linear-gradient(180deg, #e50914, #db0510);
  color: white;
  border: none;
  font-family: "Netflix Sans Light";
  height: 60px;
  width: 250px;
  font-size: 1.625rem;
  border: 1px solid #333;
  cursor: pointer;
  @media ${devices.large} {
    width: 140px;
    height: 48px;
    font-size: 1rem;
    border-radius: 4px;
  }
  @media ${devices.medium} {
    width: 120px;
    height: 40px;
    font-size: 0.8rem;
  }
  &.signin {
    width: 100%;
    font-size: 1rem;
  }
  &.signup {
    width: 100%;
    font-size: 1rem;
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

