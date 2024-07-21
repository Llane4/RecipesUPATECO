import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

import Recetas from './components/Recetas'
import Navbar from './components/Navbar'

function App() {
  const [isOpen, setIsOpen] = useState(0)
  
  return (
    <div >
      <Navbar/>
      <div style={{marginTop:"52px"}}>
        <Recetas />
      </div>
     
    </div>
  )
}

export default App
