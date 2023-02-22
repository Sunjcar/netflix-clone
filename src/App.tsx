import Home from "./Components/LandingPage/Home";
import { Routes, Route, BrowserRouter as Router, useNavigate, useMatch, Navigate } from "react-router-dom";
import SignIn from "./Components/SignInPage/SignIn";
import SignUp from "./Components/SignUpPage";
import { useStateValue } from "./Components/State";
import { ReactElement, useEffect, useState } from "react";
import { isTab, Tab } from "./Services/types";
import { userService } from "./Services/UserService";
import { Main } from "./Components/SliderPage";
import tmdbAPI from "./Services/tmdbAPI";
import { setHomeData, setShowData, setUser } from "./Components/State/reducer";
import VideoPage from "./Components/VideoPage/Video";

const Auth = ({ children }: { children: ReactElement; }) => {
  const [{ user }] = useStateValue();

  if (!user) {
    return <Navigate replace to="/sign-in" />;
  }

  return children;
};

const App = () => {
  
  const [{ user }, dispatch] = useStateValue();
  const [tab, setTab] = useState<Tab>('home');
  const navigate = useNavigate();
  const match = useMatch<'tab', string>('browse/:tab');

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("netflix-cloneUser");
    const loggedUserList = window.localStorage.getItem(
      "netflix-cloneUser-List"
    );
    if (loggedUser && loggedUserList) {
      const user = JSON.parse(loggedUser);
      const mylist = JSON.parse(loggedUserList);
      userService.setToken(user.token);
      dispatch(setUser({ ...user, mylist }));
      navigate("/browse");
    }
  }, []);

  useEffect(() => {
    if (match) {
      const tab = match.params.tab;
      if (isTab(tab)) setTab(tab);
    }
  }, [match]);

  useEffect(() => {
    const showFilters = tmdbAPI.sliderOptions;

    for (const filter of showFilters) {
      if (filter.movieUrl)
        tmdbAPI.getShowsLists(filter.movieUrl).then((data) => {
          if (data) {
            dispatch(setShowData(data, filter.filter));
            dispatch(setHomeData(data, filter.filter));
          }
        });
      if (filter.tvUrl)
        tmdbAPI.getShowsLists(filter.tvUrl).then((data) => {
          if (data) {
            dispatch(setShowData(data, filter.filter));
            dispatch(setHomeData(data, filter.filter));
          }
        });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='browse/:tab'
          element={
            <Auth>
              <Main tab={tab} />
            </Auth>
          }
           />
        <Route
          path="browse/"
          element={
            <Auth>
              <Main tab={"home"} />
            </Auth>
          }
        />
           <Route
          path="/watch/movie/:id"
          element={
            <Auth>
              <VideoPage type={"movie"} />
            </Auth>
          }
        />
        <Route
          path="/watch/tv/:id"
          element={
            <Auth>
              <VideoPage type={"tv"} />
            </Auth>
          }
        />
        <Route
          path="/browse/"
          element={
            <Auth>
              <Main tab={"home"} />
            </Auth>
          }
        />
        <Route
          path="/"
          element={user ? <Navigate replace to="browse" /> : <Home />}
        />

      </Routes>
    </div>
  );
};

export default App;
