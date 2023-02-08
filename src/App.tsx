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
import { setHomeData, setShowData } from "./Components/State/reducer";

const Auth = ({ children }: { children: ReactElement; }) => {
  const [{ user }] = useStateValue();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

const App = () => {

  const [{ user }, dispatch] = useStateValue();
  const [tab, setTab] = useState<Tab>('home');
  const navigate = useNavigate();
  const match = useMatch<'tab', string>('browse/:tab');

  useEffect(() => {
    const storedUser = window.localStorage.getItem('netflix-clone-user');
    const storedUserList = window.localStorage.getItem('netflix-clone-user-list');

    if (storedUser && storedUserList) {
      const user = JSON.parse(storedUser);
      const list = JSON.parse(storedUserList);
      userService.setToken({ ...user, list });
      navigate('browse');
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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='/browse/:tab'
        element={
          <Auth>
            <Main tab={tab} />
          </Auth>
        } />

    </Routes>
  );
};

export default App;
