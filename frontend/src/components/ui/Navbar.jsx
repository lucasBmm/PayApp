// NavigationBar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

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
  transition: background 1s ease
`;

const HomeLink = styled.a`
  color: white;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const NavLink = styled.a`
  color: white;
  margin-left: 1rem;
`;

const RegisterButton = styled.button`
  display: ${({ signedIn }) => (signedIn ? 'none' : 'block')};
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

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
      <HomeLink href="/">Home</HomeLink>
      <NavLinks>
        <NavLink href="/account">Account</NavLink>
        <NavLink href={signedIn ? '/sign-out' : '/sign-in'}>{signedIn ? 'Sign Out' : 'Sign In'}</NavLink>
        <RegisterButton signedIn={signedIn} onClick={handleClick}>Register</RegisterButton>
      </NavLinks>
    </Nav>
  );
};

export default NavigationBar;
