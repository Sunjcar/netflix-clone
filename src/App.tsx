import Home from "./Components/LandingPage/Home"
import { Routes, Route, BrowserRouter as Router, useNavigate, useMatch, Navigate } from "react-router-dom"
import SignIn from "./Components/SignInPage/SignIn"
import SignUp from "./Components/SignUpPage"
import { useStateValue } from "./Components/State"
import { ReactElement, useEffect, useState } from "react"
import { Tab } from "./Services/types"
import { userService } from "./Services/UserService"
import { Main } from "./Components/SliderPage"

const Auth = ({ children }: { children: ReactElement }) => {
  const [{ user }] = useStateValue();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

const App = () => {

  const [{ user }, dispatch] = useStateValue();
  const [tab, setTab] = useState<Tab>('home')
  const navigate = useNavigate();
  const match = useMatch<'tab', string>('browse/:tab')

  useEffect(() => {
    const storedUser = window.localStorage.getItem('netflix-clone-user')
    const storedUserList = window.localStorage.getItem('netflix-clone-user-list')

    if (storedUser && storedUserList) {
      const user = JSON.parse(storedUser);
      const list = JSON.parse(storedUserList)
      userService.setToken({ ...user, list })
      navigate('browse')
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='/browse/:tab' element={<Auth><Main tab={tab} />
        </Auth>} />
      </Routes>
    </Router>
  )
}

export default App
