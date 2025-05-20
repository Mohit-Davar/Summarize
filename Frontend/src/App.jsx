import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import Dashboard from '@/pages/Dashboard';
// import Templates from "@/pages/Templates";
// import Devices from '@/pages/Devices';
// import Layout from '@/Layout';
import { Toast } from './components/ui/Error';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        {/* <Route element={<Layout />}> */}
        {/* <Route path="/devices/all" element={<Devices />} /> */}
        {/* <Route path="/templates/all" element={<Templates />} /> */}
        {/* <Route path="/dashboards/all" element={<Dashboard />} /> */}
        {/* </Route> */}
      </Routes>
      <Toast />
    </>
  )
}