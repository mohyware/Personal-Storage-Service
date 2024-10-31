import './App.css';
import { Login, Register, Home, Error } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
export default App;
