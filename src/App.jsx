import { useState } from 'react'
import Login from "./Pages/Login"
import Cadastro from "./Pages/Cadastro"
import Home from "./Pages/Home"
import RecuperarSenha from './Pages/RecuperarSenha'
import { BrowserRouter as Router, Link, Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="*" element={<p>ERRO 404</p>} />
          <Route path="/Home" element={<Home />} />
          <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
