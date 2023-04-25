import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/ui/Layout';
import { setToken } from '../utils/TokenService';
import { useNavigate } from "react-router-dom";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
`;

const LoginForm = styled.form`
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

const LoginTitle = styled.h1`
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const data = { email, password };

            fetch('rest/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setToken(data.token);
                    navigate('/');
                })
                .catch((error) => console.error(error));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Please enter an e-mail address';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid e-mail address';
        }

        if (!password) {
            errors.password = 'Please enter a password';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <Layout>
            <LoginPage>
                <LoginForm onSubmit={handleSubmit}>
                    <LoginTitle>Login</LoginTitle>
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
                    <SubmitButton type="submit">Submit</SubmitButton>
                </LoginForm>
            </LoginPage>
        </Layout>
    )
};

export default Login;