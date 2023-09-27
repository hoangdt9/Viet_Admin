import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
// import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  // const { isAuthenticated } = useAuth();

  return (
    <>
      {
        true ? <Layout>{children}</Layout> : <Navigate to="/signin" replace />
      }
    </>
  );
}

export default PrivateRoute;