import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const TransactionsPageDate = styled.span`
  font-weight: bold;
`;

const TransactionsPageDescription = styled.span`
  margin-left: 0.5rem;
`;

const TransactionsPageAmount = styled.span`
  margin-left: 0.5rem;
`;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <TransactionsPageContainer>
      <TransactionsPageTitle>Transactions History</TransactionsPageTitle>
      <TransactionsPageList>
        {transactions.map((transaction) => (
          <TransactionsPageItem key={transaction.id}>
            <TransactionsPageDate>{transaction.date}:</TransactionsPageDate>
            <TransactionsPageDescription>{transaction.description}</TransactionsPageDescription>
            <TransactionsPageAmount>({transaction.amount})</TransactionsPageAmount>
          </TransactionsPageItem>
        ))}
      </TransactionsPageList>
    </TransactionsPageContainer>
  );
};

export default TransactionsPage;