import { useState } from 'react'
import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Chagebox from './pages/ChangeBox'
import Home from './pages/Home'
import Document from './pages/Document'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>


     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/changebox' element={<Chagebox/>}></Route>
      <Route path='/document' element={<Document/>}></Route>
     </Routes>
    </>
  )
}

export default App