import { BrowserRouter, Routes, Route } from 'react-router-dom'

import "./App.css";
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
