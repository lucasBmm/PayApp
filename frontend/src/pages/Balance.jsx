import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DepositSection from '../components/ui/Deposit';
import Transfer from '../components/ui/Transfer';
import authenticatedFetch from '../utils/AuthenticationFetch';
import { Link } from 'react-router-dom';

const BalancePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;

  @media screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const BalanceTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const BalanceText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ToggleButton = styled.button`
  background-color: #1877f2;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1462c4;
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const BalancePage = () => {
  const [balance, setBalance] = useState(100.00);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    authenticatedFetch('rest/user/balance')
      .then((response) => response.json())
      .then((data) => setBalance(data.balance))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BalancePageContainer>
      <BalanceContainer>
        <BalanceTitle>Your Balance</BalanceTitle>
        {balance !== null && (
          <BalanceText>{showBalance ? `$${balance}` : '---'}</BalanceText>
        )}
        <ToggleButton onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? 'Hide Balance' : 'Show Balance'}
        </ToggleButton>
        <p>Your account information and balance will be displayed here.</p>
        <Link to="/account/transactions">View Transactions History</Link>
      </BalanceContainer>
      <Transfer />
      <DepositSection />
    </BalancePageContainer>
  );
};

export default BalancePage;
