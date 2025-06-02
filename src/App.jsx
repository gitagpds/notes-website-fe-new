import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import HomePage from './pages/homepage';
import InputNote from './pages/inputnotes';
import ViewNotes from './pages/viewnotes';

function App() {
  return (
    <Routes>
      {/* Default redirect ke login */}
      <Route path="/" element={<Navigate to="/login_page" replace />} />

      {/* Auth Pages */}
      <Route path="/login_page" element={<Login />} />
      <Route path="/register_page" element={<Register />} />

      {/* Protected/User Pages */}
      <Route path="/home_page" element={<HomePage />} />
      <Route path="/add-note" element={<InputNote />} />
      <Route path="/view-notes" element={<ViewNotes />} />
    </Routes>
  );
}

export default App;
