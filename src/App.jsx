import { Router, Route, useNavigate, Routes } from 'react-router-dom'
import { Navbar, Home, Booklist } from './components/index'
import { useState } from 'react';


function App({ booklist, removeFromBooklist }) {

  return (
    <div >

      <Routes>
        <>
          <Route path="" element={<Home />} />
          <Route path="/booklist" element={<Booklist booklist={booklist} removeFromBooklist={removeFromBooklist} />} />
          <Route path="home" element={<Home />} />
        </>

      </Routes>


    </div>
  )
}

export default App
