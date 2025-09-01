
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { Game } from './pages/Game'

function App() {

  return (
    <div className='min-h-screen bg-slate-900'>
      <BrowserRouter basename='/app'>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/game" element={<Game/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
