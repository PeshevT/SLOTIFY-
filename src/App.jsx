import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ServiceDetail from './pages/ServiceDetail'

//Wrap it with the  content provider
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path="/services/:id" element={<ServiceDetail />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
