import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Videos from "./pages/VideoList";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";

export default function App() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Navigate to="/videos" />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<Watch />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<Navigate to="/videos" />} />
      </Routes>
    </BrowserRouter>
  );
}
