import React, { FormEvent, useEffect, useState } from 'react'
import { useStateValue } from '../State';

import { validateEmail, validatePhone } from '../utils/helpers';

export type TextMode = "signin" | "signup" | "landing";
export type TextType = "account" | "password";

interface TextHook {
    label: string;
    mode: TextMode;
    type: TextType;
    value: string;
    errMsg: string;
    handleInput: (event: FormEvent<HTMLInputElement>) => void;
    handleEmptySubmit: () => void;
}

export const useTextField = (
    label: string,
    mode: TextMode,
    type: TextType
): TextHook => {
    const [value, setValue] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [{ account }] = useStateValue();
    useEffect(() => {
        if (type === "account" && account) {
          setValue(account);
        }
      }, []);
    
      const usernameValidator = (input: string) => {
        if (!input) throw new Error("Please enter a valid email or phone number");
        else if (/.*[a-zA-Z].*/.test(input)) {
          if (!validateEmail(input)) throw new Error("Please enter a valid email.");
        } else if (!validatePhone(input))
          throw new Error("Please enter a valid phone number");
      };
    
      const passwordValidator = (input: string) => {
        if (input.length < 4 || input.length > 60)
          throw new Error(
            "Your password must contain between 4 and 60 characters."
          );
      };
    
      const emailValidator = (input: string) => {
        if (!input || !validateEmail(input))
          throw new Error("Please enter a valid email");
      };
    
      const validator = (input: string = value) => {
        try {
          if (mode === "signin") {
            if (type === "account") usernameValidator(input);
            else passwordValidator(input);
          } else {
            if (type === "account") emailValidator(input);
            if (type === "password" && !input)
              throw new Error("Password is required");
            if (type === "password") passwordValidator(input);
          }
          setErrMsg("");
        } catch (error) {
          if (error instanceof Error) setErrMsg(error.message);
        }
      };
    
      const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event.currentTarget.value;
        setValue(input);
    
        validator(input);
      };
    
      const handleEmptySubmit = () => {
        validator();
      };
    
      return {
        label,
        mode,
        type,
        value,
        errMsg,
        handleInput,
        handleEmptySubmit,
      };
    };

    export const types = () => {
        return (
            <div>types</div>
        )
    }
