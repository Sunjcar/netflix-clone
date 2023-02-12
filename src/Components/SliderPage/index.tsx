import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbAPI from "../../Services/tmdbAPI";
import { Show, Tab } from "../../Services/types";
import { NavBar_Main } from "../Navbar";
import { ShowByFilter, useStateValue } from "../State";
import { removeUser } from "../State/reducer";
import { rearrangeShowByFilter, signOut } from "../utils/helpers";
import Billboard from "./Billboard";
import List from "./List";
import Slider from "./Slider";


interface SliderProps {
    tab: Tab;
}

export const Main = ({ tab }: SliderProps) => {
    const [{ tvshowData, movieData, homeData }, dispatch] = useStateValue();
    const [displayContent, setDisplayContent] = useState<ShowByFilter[]>([]);
    const [billboard, setBillboard] = useState<Show | null>(null);
    const [Scrolled, SetScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            SetScrolled(window.scrollY > 0);
        });
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        if (tab === 'tvshows') setDisplayContent(rearrangeShowByFilter(tvshowData));
        if (tab === 'movies') setDisplayContent(rearrangeShowByFilter(movieData));
        if (tab === 'home') setDisplayContent(rearrangeShowByFilter(homeData));

        tmdbAPI
            .getShowForBillboard(tab)
            .then((data: Show | null) => setBillboard(data));
    }, [tab, tvshowData, movieData, homeData]);

    const handleLogout = () => {
        dispatch(removeUser());
        signOut();
        navigate("/");
    };
    return (
        <div className=" bg-[#141414] text-white">
          <NavBar_Main scrolled={Scrolled} handleLogout={handleLogout} />
          {tab !== "mylist" ? (
            <>
              <Billboard billboardMovie={billboard} />
              <div className=" mt-[12vw] sm:mt[2vh]">
                {displayContent.length !== 0 &&
                  displayContent.map((data, index) => (
                    <Slider
                      key={index}
                      filter={data.filter}
                      shows={data.shows}
                    />
                  ))}
              </div>
            </>
          ) : (
            <List/>
          )}
        </div>
      );
    };