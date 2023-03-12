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
    const [animationStyle, setAnimationStyle] = useState<CSSProperties>({});
    const [isMoved, setIsMoved] = useState<boolean>(false);

    const setWidth = () => {
        if (ref.current)
            setContainerWidth(ref.current.clientWidth);
    };

    useEffect(() => {
        setWidth();
    }, [ref.current]);

    useEffect(() => {
        window.addEventListener("resize", setWidth);

        return () => {
            window.removeEventListener("resize", setWidth);
        };
    }, []);

    //for window resize
    useEffect(() => {
        let newDisplayCount = 7;
        if (window.innerWidth > 950) newDisplayCount = 7;
        else if (window.innerWidth > 550) newDisplayCount = 5;
        else newDisplayCount = 3;

        const newshowWidth = containerWidth / newDisplayCount;
        if (isMoved) {
            setAnimationStyle({
                transform: `translateX(${-containerWidth - newshowWidth}px)`,
            });
            if (count > newDisplayCount) {
                const newItems = rotateMovieArray(2, allShows);
                setDisplayShows(newItems.slice(0, newDisplayCount * 3 + 2));
                setAllShows(newItems);
            } else if (count < newDisplayCount) {
                const newItems = rotateMovieArray(-2, allShows);
                setDisplayShows(newItems.slice(0, newDisplayCount * 3 + 2));
                setAllShows(newItems);
            }
        }

        setShowWidth(newshowWidth);
        setCount(newDisplayCount);
    }, [containerWidth]);

    useEffect(() => {
        setAllShows(shows);
        setDisplayShows(shows.slice(0, count * 3 + 2));
        setAnimationStyle({ transform: `translateX(0px)` });
        setIsMoved(false);
    }, [shows]);

    const handleLeftClick = () => {
        setAnimationStyle({
            transform: `translateX(${0 - showWidth}px)`,
            transition: "transform 0.5s",
        });
        const newItems = rotateMovieArray(-count, allShows);
        setTimeout(() => {
            setAllShows(newItems);
            setDisplayShows(newItems.slice(0, count * 3 + 2));
            setAnimationStyle({
                transform: `translateX(${-containerWidth - showWidth}px)`,
            });
        }, 500);
        setIsMoved(true);
    };

    const handleRightClick = () => {
        let rotate = 0,
            offset = 0;
        if (isMoved) {
            offset = -containerWidth * 2 - showWidth;
            rotate = count;
        } else {
            offset = -containerWidth;
            rotate = -1;
        }

        setAnimationStyle({
            transform: `translateX(${offset}px)`,
            transition: "transform 0.5s",
        });
        const newItems = rotateMovieArray(rotate, allShows);
        setTimeout(() => {
            setAllShows(newItems);
            setDisplayShows(newItems.slice(0, count * 3 + 2));
            setAnimationStyle({
                transform: `translateX(${isMoved ? offset + containerWidth : offset - showWidth
                    }px)`,
            });
        }, 500);
        setIsMoved(true);
    };

    const sliderProps = {
        style: animationStyle,
    };

    return {
        ref,
        showWidth,
        handleLeftClick,
        handleRightClick,
        sliderProps,
        isMoved,
        displayShows,
    };
};
