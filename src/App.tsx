import Home from "./Components/LandingPage/Home"
import { Routes, Route,BrowserRouter as Router } from "react-router-dom"
import SignIn from "./Components/SignInPage/SignIn"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Routes>
    </Router>
  )
}

export default App
