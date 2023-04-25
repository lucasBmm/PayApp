import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/ui/Layout';

const RegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
`;

const RegisterForm = styled.form`
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

const RegisterTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const InputField = styled.input`
  height: 2.5rem;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #808080;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #1877f2;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
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

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const data = { username, email, password, confirmPassword };

            fetch('rest/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!username) {
            errors.username = 'Please enter a user name';
        }

        if (!email) {
            errors.email = 'Please enter an e-mail address';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid e-mail address';
        }

        if (!password) {
            errors.password = 'Please enter a password';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <Layout>
            <RegisterPage>
                <RegisterForm onSubmit={handleSubmit}>
                    <RegisterTitle>Register</RegisterTitle>
                    <InputField
                        type="text"
                        placeholder="User name"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                    <InputField
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors.password && <ErrorText>{errors.password}</ErrorText>}
                    <InputField
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    {errors.confirmPassword && (
                        <ErrorText>{errors.confirmPassword}</ErrorText>
                    )}
                    <SubmitButton type="submit">Submit</SubmitButton>
                </RegisterForm>
            </RegisterPage>
        </Layout>
    );
};

export default Register;
