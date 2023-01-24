import Home from "./Components/LandingPage/Home"
import { Routes, Route,BrowserRouter as Router } from "react-router-dom"
import SignIn from "./Components/SignInPage/SignIn"
import SignUp from "./Components/SignUpPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App
