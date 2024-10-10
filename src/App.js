import logo from './logo.svg';
import './App.css';
import { Login, Register, Home, Error } from './pages';
import ProtectedRoute from './components/ProtectedRoute';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
export default App;