import React, { useState } from 'react';
import styled from 'styled-components';
import { NumericFormat } from 'react-number-format';

const DepositForm = styled.form`
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

const DepositTitle = styled.h1`
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

const DepositSection = ({ onDeposit }) => {
    const [depositValue, setDepositValue] = useState('');
    const [depositValueValid, setDepositValueValid] = useState(false);

    const handleDepositValueChange = (values) => {
        setDepositValue(parseFloat(values.value))
        setDepositValueValid(values.floatValue > 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('rest/user/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ amount: parseFloat(depositValue) }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDepositValue('');
                setDepositValueValid(false);
                onDeposit();
            })
            .catch((error) => console.error(error));
    };

    const isSubmitDisabled = !depositValueValid;

    return (
        <DepositForm onSubmit={handleSubmit}>
            <DepositTitle>Make a Deposit</DepositTitle>
            <InputField
                placeholder="Deposit amount"
                value={depositValue}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                onValueChange={(values) =>
                    handleDepositValueChange(values)
                }
            />
            <SubmitButton type="submit" disabled={isSubmitDisabled}>
                Submit
            </SubmitButton>
        </DepositForm>
    );
};

export default DepositSection;
