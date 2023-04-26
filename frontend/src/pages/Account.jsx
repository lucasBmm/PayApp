import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DepositSection from '../components/ui/Deposit';
import Transfer from '../components/ui/Transfer';
import authenticatedFetch from '../utils/AuthenticationFetch';
import { Link } from 'react-router-dom';
import Layout from '../components/ui/Layout';
import TransactionsPage from './Transactions';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { keyframes } from 'styled-components';

const BalancePageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 2% 0 10% 0;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    padding: 15% 0 15% 0;
    justify-content: center;
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: 3% 10px;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;

  @media screen and (max-width: 480px) {
    padding: 1rem;
    justify-content: center;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  @media screen and (max-width: 480px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media screen and (max-width: 480px) {
    width: 90%;
    margin: 0 auto;
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

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ReloadIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #3f51b5; 

  &:hover {
    cursor: pointer;
    animation: ${spinAnimation} 3s linear infinite;
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


const AccountPage = () => {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [isUpdatingBalance, setIsUpdatingBalance] = useState(false);
  const [userAccount, setAccount] = useState(null);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = () => {
    setIsUpdatingBalance(true);
    authenticatedFetch('account/balance')
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.balance);
        setAccount(data.accountNumber)
      })
      .catch((error) => console.log(error))
      .finally(() => setIsUpdatingBalance(false));
  };

  return (
    <Layout>
      <BalancePageContainer>
        <LeftContainer>
          <BalanceContainer>
            <BalanceTitle>Your Balance</BalanceTitle>
            {balance !== null && <BalanceText>{showBalance ? `$${balance}` : '---'}</BalanceText>}
            <ToggleButton onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? 'Hide Balance' : 'Show Balance'}
            </ToggleButton>
            <p>Your account number: {userAccount} </p>
            <ReloadIcon onClick={fetchBalance} disabled={isUpdatingBalance} icon={faSyncAlt} />
            {isUpdatingBalance ? 'Updating Balance...' : 'Reload Balance'}
          </BalanceContainer>
          {userAccount && <TransactionsPage accountNumber={userAccount} />}
        </LeftContainer>
        <RightContainer>
          <Transfer userAccount={userAccount} />
          <DepositSection />
        </RightContainer>
      </BalancePageContainer>
    </Layout>
  );
};

export default AccountPage;
