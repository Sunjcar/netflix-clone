import { useState } from "react";
import styled from "styled-components";
import { RxCross1 as Cross_icon } from "react-icons/rx";
import QandA from "./questions";

const Question = ({
    question,
    answer,
}: {
    question: string;
    answer: JSX.Element;
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <li>
            <button onClick={() => setOpen(!open)}>
                {question}
                <ListWrapper className={open ? "open" : "close"} />
            </button>
            <div className={open ? "open" : "close"}>
                <span>{answer}</span>
            </div>
        </li>
    );
};

export const FAQ = () => {
    return (
        <FAQList>
            {QandA.map((pair, index) => (
                <Question
                    key={index}
                    question={pair.question}
                    answer={pair.answer}
                />
            ))}
        </FAQList>
    );
};

const size = {
    small: "350px",
    medium: "550px",
    mediumLarge: "750px",
    large: "950px",
};

export const devices = {
    small: `(max-width: ${size.small})`,
    medium: `(max-width: ${size.medium})`,
    mediumLarge: `(max-width: ${size.mediumLarge})`,
    large: `(max-width: ${size.large})`,
};

const FAQList = styled.ul`
      margin: 2em auto;
      max-width: 800px;
      color: white;
      font-family: "Netflix Sans Light";
      padding: 0;
      @media ${devices.medium} {
        margin: 1em auto;
        max-width: 100%;
      }
      li {
        list-style-type: none;
        margin: 0 0 8px;
      }
      button {
        border: 0;
        margin-bottom: 1px;
        padding: 0.8em 2.2em 0.8em 1.2em;
        position: relative;
        font-size: 1.7rem;
        font-family: "Netflix Sans Light";
        width: 100%;
        text-align: left;
        background: #303030;
        color: white;
        cursor: pointer;
        @media ${devices.medium} {
          font-size: 1rem;
        }
      }
      div {
        background: #303030;
        text-align: left;
        font-size: 1.7rem;
        transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
        overflow: hidden;
        @media ${devices.medium} {
          font-size: 1rem;
        }
      }
      div.open {
        max-height: 1200px;
      }
      div.close {
        max-height: 0px;
      }
      span {
        display: inline-block;
        padding: 1.2em;
      }
    `;

const ListWrapper = styled(Cross_icon)`
    fill: white;
    position: absolute;
    right: 1em;
    top: 35%;
    transition: transform 0.3s;
    &.close {
      transform: scale(1.3) rotate(-45deg);
    }
    &.open {
      transform: scale(1.3);
    }
    `;