import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbAPI from "../../Services/tmdbAPI";
import { Show, Tab } from "../../Services/types";
import { ShowByFilter, useStateValue } from "../State";
import { rearrangeShowByFilter } from "../utils/helpers";


interface SliderProps {
    tab: Tab;
}

export const Main = ({ tab }: SliderProps) => {
    const [{ tvshowData, movieData, homeData}, dispatch] = useStateValue();
    const [displayContent, setDisplayContent] = useState<ShowByFilter[]>([]);
    const [billboard, setBillboard] = useState<Show | null>(null);
    const [Scrolled, SetScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            SetScrolled(window.scrollY > 0)
        });
    });

    useEffect(() => {
        window.scrollTo(0,0);

        if(tab === 'tvshows') setDisplayContent(rearrangeShowByFilter(tvshowData))
        if(tab === 'movies') setDisplayContent(rearrangeShowByFilter(movieData))
        if(tab === 'home') setDisplayContent(rearrangeShowByFilter(homeData))

        tmdbAPI
        .getShowForBillboard(tab)
        .then((data: Show | null) => setBillboard(data));
    }, [tab, tvshowData, movieData, homeData]);
    return (
        <div className=" bg-[#141414] text-white">
        </div>
    )
}