import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Restuarent from './Pages/Restuarent'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Restuarent/>}/>
    </Routes>
    </>
  )
}

export default App