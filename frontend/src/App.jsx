import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './features/Auth/login'
import Problems from './pages/Problems/Problems'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/contest" element={<div>Contest Page</div>} />
        <Route path="/discuss" element={<div>Discuss Page</div>} />
        <Route path="/interview" element={<div>Interview Page</div>} />
        <Route path="/store" element={<div>Store Page</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
