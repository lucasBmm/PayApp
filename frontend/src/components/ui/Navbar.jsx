// NavigationBar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { deleteToken, getToken } from '../../utils/TokenService';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${({ scrolled }) => (scrolled ? 'black' : 'transparent')};
  color: ${({ scrolled }) => (scrolled ? 'white' : 'black')};
  transition: background 1s ease
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;


const HomeLink = styled.a`
  font-weight: bold;
  color: ${({ scrolled }) => (scrolled ? 'white' : 'black')};
`;


const NavLink = styled.a`
  margin-left: 1rem;
  color: ${({ scrolled }) => (scrolled ? 'white' : 'black')};
`;

const RegisterButton = styled.button`
  display: ${({ signedIn }) => (signedIn ? 'none' : 'block')};
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: transparent;
  border: 2px solid ${({ scrolled }) => (scrolled ? 'white' : 'black')};
  color: ${({ scrolled }) => (scrolled ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;


const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(getToken() != null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  const handleSignSinoutClick = () => {
    if (signedIn) {
      deleteToken();
    } 
    navigate("/sign-in");
  }

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <HomeLink scrolled={scrolled} href="/">Home</HomeLink>
      <NavLinks>
        {signedIn && <NavLink scrolled={scrolled} href="/account">Account</NavLink>}
        <NavLink scrolled={scrolled} onClick={handleSignSinoutClick}>{signedIn ? 'Sign Out' : 'Sign In'}</NavLink>
        <RegisterButton scrolled={scrolled} signedIn={signedIn} onClick={handleClick}>Register</RegisterButton>
      </NavLinks>
    </Nav>
  );
};

export default NavigationBar;
