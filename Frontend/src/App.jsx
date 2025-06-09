import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toast } from './components/ui/Error';
import { LoadingSpinner } from './components/ui/Loading';

const Chat = lazy(() => import('./pages/Chat'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Signup = lazy(() => import('./pages/Signup'));
const Upload = lazy(() => import('./pages/Upload'));


// eslint-disable-next-line no-unused-vars
const withSuspense = (Component) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={withSuspense(LandingPage)} />
        <Route path="/signup" element={withSuspense(Signup)} />
        <Route path="/login" element={withSuspense(Login)} />
        <Route path="/upload" element={withSuspense(Upload)} />
        <Route path="/chat" element={withSuspense(Chat)} />
        <Route path="*" element={withSuspense(NotFound)} />
      </Routes>
      <Toast />
    </>
  );
}