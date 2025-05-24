import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Upload from './pages/Upload';
import { Toast } from './components/ui/Error';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toast />
    </>
  )
}