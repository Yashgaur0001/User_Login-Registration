// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Register from './Registration'
import Login from './Login';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
