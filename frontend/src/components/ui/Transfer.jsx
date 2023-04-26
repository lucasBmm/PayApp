import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NumericFormat } from 'react-number-format';
import authenticatedFetch from '../../utils/AuthenticationFetch';

const TransferPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransferForm = styled.form`
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

const TransferTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const InputField = styled(NumericFormat)`
  height: 2.5rem;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ valid }) => (valid ? '#808080' : '#ff4136')};
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #1877f2;
  }
`;

const SelectField = styled.select`
  height: 2.5rem;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${({ valid }) => (valid ? '#808080' : '#ff4136')};
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #1877f2;
  }
`;

const SubmitButton = styled.button`
  background-color: #1877f2;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#1877f2' : '#1462c4')};
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

const Transfer = ({userAccount}) => {
    const [destAccount, setDestAccount] = useState('');
    const [destAccountValid, setDestAccountValid] = useState(false);
    const [transferType, setTransferType] = useState('PIX');
    const [transferValue, setTransferValue] = useState('');
    const [transferValueValid, setTransferValueValid] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = { 
          sourceAccount: userAccount, 
          destinationAccount: destAccount,
          amount: transferValue,
          transactionType: transferType 
        };

        authenticatedFetch('/transactions', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
            <TransferForm onSubmit={handleSubmit}>
                <TransferTitle>Make a Transfer</TransferTitle>
                <InputField
                    type="number"
                    step="1"
                    placeholder="Account"
                    value={destAccount}
                    onChange={(event) => setDestAccount(event.target.value)}
                />
                <SelectField
                    value={transferType}
                    onChange={(event) => setTransferType(event.target.value)}
                >
                    <option value="PIX">PIX</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                </SelectField>
                <InputField
                    placeholder="Transfer amount"
                    value={transferValue}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    onValueChange={(values) =>
                        setTransferValue(parseFloat(values.value))
                    }
                />
                <SubmitButton type="submit">Submit</SubmitButton>
            </TransferForm>
    );
};

export default Transfer;
