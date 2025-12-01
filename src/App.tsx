// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ScrollAnimation from './components/ScrollAnimation/ScrollAnimation'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import Error404 from './components/404/404'

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <ScrollAnimation textURL='/assets/fakeHTML.html' right={false} />
      {/* <ScrollAnimation textURL='/assets/fakeCSS.css' right={true} /> */}

      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>

      <div className='footer' style={{ display: 'none' }}>
        <p>© 2025 Elijah Wolf</p>
      </div>
    </BrowserRouter>
  )
}

export default App
