import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transfer from './components/ui/Transfer';
import AccountPage from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TransactionsPage from './pages/Transactions';
import AuthWrapper from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/sign-in" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/transactions" element={<TransactionsPage />} />
        {/* <Route exact path="transfer" element={<Transfer />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
