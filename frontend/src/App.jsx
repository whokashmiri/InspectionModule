import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Header from './components/Header';
import ProtectedRoute from './routes/ProtectedRoute';
import CompanySelection from './components/CompanySelection';
import DashboardPage from './pages/dashboard'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
        path="/select-company"
        element={
        <ProtectedRoute>
        <CompanySelection />
        </ProtectedRoute>
         }/>
        {/* Add dashboard or home route here */}
          <Route path="/dashboard" element={<DashboardPage />} />

      </Routes>
    </BrowserRouter>
  );
}
