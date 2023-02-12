import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../Services/UserService';
import { devices } from '../LandingPage/FAQ';
import { TextField, useTextField } from '../SignInPage/types';
import { useStateValue } from '../State';
import { setUser } from '../State/reducer';
import { signIn } from '../utils/helpers';
import styled from "styled-components";

import { NavBar, SignIn } from '../Navbar';
import { MdWarning } from 'react-icons/md';

const SignUp = () => {

  const [errMsg, setErrMsg] = useState<string>("");
  const [, dispatch] = useStateValue();
  const email = useTextField("Email", "signup", "account");
  const password = useTextField("Add a password", "signup", "password");
  const navigate = useNavigate();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.value || !password.value) {
      email.handleEmptySubmit();
      password.handleEmptySubmit();
      return;
    }
    if (email.errMsg || password.errMsg) return;

    try {
      const newUser = await userService.createUser({
        username: email.value,
        password: password.value,
      });
      dispatch(setUser(newUser));
      signIn(newUser);
      navigate("/browse");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.error) {
          const error = err.response?.data.error as string;
          if (error.includes("unique"))
            setErrMsg(
              "Looks like that account already exists. Sign into that account or try using a different email."
            );
          else setErrMsg(error);
        }
      }
    }

  };
  return (
    <SignUpPageContainer>
      <NavBar className="signup-page">
        <SignIn to="/login" className="signup">
          Sign In
        </SignIn>
      </NavBar>
      <SignUpFormContainer>
        <SignUpForm>
          {errMsg ? (
            <div className="error-message">
              <div>
                <MdWarning />
              </div>
              <h4>{errMsg}</h4>
            </div>
          ) : null}
          <h1>Create a password to start your membership</h1>
          <h3>Just a few more steps and you&apos;re done!</h3>
          <h3>We hate paperwork, too</h3>
          <FormField>
            <TextField {...email} />
            <TextField {...password} />
            <RedButton onClick={handleSignUp} className="signup">
              Sign Up
            </RedButton>
          </FormField>
        </SignUpForm>
      </SignUpFormContainer>
    </SignUpPageContainer>
  );
};

export default SignUp;


export const SignUpPageContainer = styled.div`
  background-color: white;
  color: #333;
`;

export const SignUpFormContainer = styled.div`
  border-top: 1px solid #e6e6e6;
  margin-top: 20px;
`;

export const SignUpForm = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 30px 50px 40px;
  font-family: "Netflix Sans Light";
  color: #333;
  max-width: 500px;
  min-height: 660px;
  margin: 0 auto;
  z-index: 10;
  @media ${devices.medium} {
    padding: 15px 25px 20px;
  }
  div.error-message {
    padding: 20px 10px;
    background-color: rgb(251, 164, 4);
    display: flex;
    align-items: center;
    column-gap: 1rem;
    @media ${devices.medium} {
      padding: 10px 5px;
      svg {
        font-size: 1rem;
      }
    }
    h4 {
      margin: 0;
    }
    svg {
      font-size: 1.5rem;
    }
  }
  h1 {
    font-family: "Netflix Sans";
    font-weight: 400;
  }
  h3 {
    margin: 0 0 16px;
  }
`;

export const FormField = styled.div`
  flex: 1;
  input {
    border: 1px solid #8c8c8c;
  }
  button {
    border: none;
    border-radius: 4px;
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