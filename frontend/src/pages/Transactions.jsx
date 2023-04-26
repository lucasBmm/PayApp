import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import authenticatedFetch from '../utils/AuthenticationFetch';

const TransactionsPageContainer = styled.div`
  padding: 2rem;
`;

const TransactionsPageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TransactionsPageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TransactionsPageItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
`;

const TransactionIcon = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 1.5rem;
  color: #3f51b5; // Change this to the color you want
`;

const TransactionDetails = styled.div`
  flex: 4;
`;

const TransactionType = styled.span`
  font-weight: bold;
`;

const TransactionDate = styled.span`
  display: block;
  color: gray;
  font-size: 0.8rem;
`;

const TransactionAmount = styled.span`
  flex: 1;
  text-align: right;
`;

const TransactionsPage = ({ accountNumber }) => {
  const [transactions, setTransactions] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    authenticatedFetch('/transactions?accountNumber=' + accountNumber)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.content);
      })
      .catch((error) => console.error(error));
  }, [accountNumber]);

  return (
    <TransactionsPageContainer>
      <TransactionsPageTitle>Transactions History</TransactionsPageTitle>
      <TransactionsPageList>
        {transactions.map((transaction, index) => (
          <TransactionsPageItem key={index}>
          <TransactionIcon icon={faExchangeAlt} />
          <TransactionDetails>
            <TransactionType>
              {transaction.amount >= 0 ? 'Received' : 'Sent'}
            </TransactionType>
            <TransactionDate>{formatDate(transaction.transactionDate)}</TransactionDate>
          </TransactionDetails>
          <TransactionAmount>$: {transaction.amount.toFixed(2)}</TransactionAmount>
        </TransactionsPageItem>
        ))}
      </TransactionsPageList>
    </TransactionsPageContainer>
  );
};

export default TransactionsPage;