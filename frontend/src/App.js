import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Transfer from './components/ui/Transfer';
import AccountPage from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TransactionsPage from './pages/Transactions';
import AuthWrapper from './utils/PrivateRoute';
import { getToken } from './utils/TokenService';

const Protected = ({ children }) => {
  if (!getToken()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/sign-in" element={<Login />} />
        <Route path="/account" element={<Protected><AccountPage /></Protected>} />
        <Route path="/account/transactions" element={<Protected><TransactionsPage /></Protected>} />
        {/* <Route exact path="transfer" element={<Transfer />} /> */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
};

export default App;
