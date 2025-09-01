import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import NotFound from './pages/NotFound/NotFound'
import Welcome from './pages/Welcome'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'

const App = () => {
  const routes = (
    <Router>
        <Routes>
            <Route path='/dashboard' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element = {<Welcome />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/verify-email' element={<VerifyEmail />} />

        </Routes>
    </Router>
  )
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
