import { RefObject, useEffect, useRef, useState } from "react";
import { CSSProperties } from "styled-components";
import { Show } from "../../Services/types";
import { rotateMovieArray } from "./helpers";

export interface SliderProps {
    style: CSSProperties;
}

interface SliderHookProps {
    ref: RefObject<HTMLDivElement>;
    displayShows: Show[];
    showWidth: number;
    handleLeftClick: () => void;
    handleRightClick: () => void;
    sliderProps: SliderProps;
    isMoved: boolean;
}

export const SliderHook = (shows: Show[]): SliderHookProps => {
    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState<number>(7);
    const [allShows, setAllShows] = useState<Show[]>([]);
    const [displayShows, setDisplayShows] = useState<Show[]>([]);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [showWidth, setShowWidth] = useState<number>(0);
    const [animation, setAnimation] = useState<CSSProperties>({});
    const [isMoved, setIsMoved] = useState<boolean>(false);
    const [animationStyle, setAnimationStyle] = useState<CSSProperties>({});

    const setWidth = () => {
        if (ref.current)
            setContainerWidth(ref.current.clientWidth);
    };

    useEffect(() => {
        setWidth();
    }, [ref.current]);

    useEffect(() => {
        let newCount = 7;
        if (window.innerWidth > 950) newCount = 7;
        else if (window.innerWidth > 550) newCount = 5;
        else newCount = 3;

        const newWidth = containerWidth / newCount;
        if (isMoved) {
            setAnimation({
                transform: `translateX(${-containerWidth - newWidth}px)`,
            });
            if (count > newCount) {
                const newShows = rotateMovieArray(2, allShows);
                setDisplayShows(newShows.slice(0, newCount * 3 + 2));
                setAllShows(newShows);
            } else if (count < newCount) {
                const newShows = rotateMovieArray(-2, allShows);
                setDisplayShows(newShows.slice(0, newCount * 3 + 2));
                setAllShows(newShows);
            }
        }
        setShowWidth(newWidth);
        setCount(newCount);
    }, [containerWidth]);

    useEffect(() => {
        setAllShows(allShows);
        setDisplayShows(allShows.slice(0, count * 3 + 2));
        setAnimation({ transform: `translate(0px)` });
        setIsMoved(false);
    }, [shows]);

    const handleLeftClick = () => {
        setAnimation({
            transform: `translateX(${0 - showWidth} px)`,
            transition: "transform 0.5s",
        });

        const newShows = rotateMovieArray(-count, allShows);
        setTimeout(() => {
            setAllShows(newShows);
            setDisplayShows(newShows.slice(0, count * 3 + 2));
            setAnimation({
                transform: `translateX(${-containerWidth - showWidth}px)`,
            });
        }, 500);
        setIsMoved(true);
    };

    const handleRightClick = () => {
        let rotate = 0,
            offSet = 0;
        if (isMoved) {
            offSet = -containerWidth * 2 - showWidth;
            rotate = count;
        } else {
            offSet = -containerWidth;
            rotate = -1;
        }

        setAnimation({
            transform: `translateX(${offSet}px)`,
            transition: "transform 0.5s",
        });

        const newShows = rotateMovieArray(rotate, allShows);
        setTimeout(() => {
            setAllShows(newShows);
            setDisplayShows(newShows.slice(0, count * 3 + 2));
            setAnimation({
                transform: `translateX(${isMoved ? offSet + containerWidth : offSet - showWidth
                    }px)`,
            });
        }, 500);
        setIsMoved(true);
    };

    const sliderProps = {
        style: animationStyle,
    }
    return {
        ref,
        showWidth,
        displayShows,
        handleLeftClick,
        handleRightClick,
        sliderProps,
        isMoved,
      };
};