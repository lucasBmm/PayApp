import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background-color: #121212;
  color: white;
  padding: 4rem 1rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 50px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #1877f2;
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FooterContactTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterContactInfo = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const SocialMediaLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const SocialMediaLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  color: #808080;
  margin-right: 1rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: white;
  }
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #808080;
  margin: 2rem 0;
`;

const PartnersSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const PartnerLogo = styled.img`
  height: 50px;
  margin: 0 1rem 1rem 0;
`;

const Location = styled.p`
  font-size: 0.7rem;
  text-align: center;
  margin-top: 1rem;
`;

const CNPJ = styled.p`
  font-size: 0.7rem;
  text-align: center;
`;

const Footer = () => {
    return (
        <FooterSection>
            <FooterContainer>
                <div>
                    <Logo src="/img/logo-white.png" alt="App Logo" />
                    <FooterLinks>
                        <FooterLinkItem><FooterLink href="#">Home</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">About Us</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">Pricing</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">Blog</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">Contact</FooterLink></FooterLinkItem>
                    </FooterLinks>
                </div>
                <div>
                    <FooterLinks>
                        <FooterLinkItem><FooterLink href="#">Terms of Use</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">Privacy Policy</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">FAQ</FooterLink></FooterLinkItem>
                        <FooterLinkItem><FooterLink href="#">Support</FooterLink></FooterLinkItem>
                    </FooterLinks>
                </div>
                <FooterContact>
                    <FooterContactTitle>Contact Us</FooterContactTitle>
                    <FooterContactInfo>123 Main St, Suite 100</FooterContactInfo>
                    <FooterContactInfo>City, State 12345</FooterContactInfo>
                    <FooterContactInfo>Email: info@app.com</FooterContactInfo>
                    <FooterContactInfo>Phone: (123) 456-7890</FooterContactInfo>
                    <SocialMediaLinks>
                        <SocialMediaLink href="#"><FaFacebookF  size={20}/></SocialMediaLink>
                        <SocialMediaLink href="#"><FaTwitter    size={20}/></SocialMediaLink>
                        <SocialMediaLink href="#"><FaInstagram  size={20}/></SocialMediaLink>
                        <SocialMediaLink href="#"><FaLinkedinIn size={20}/></SocialMediaLink>
                    </SocialMediaLinks>
                </FooterContact>
            </FooterContainer>
            <HorizontalLine />
            <PartnersSection>
                <PartnerLogo src="/img/react.png" alt="Partner 1 Logo" />
                <PartnerLogo src="/img/github.png" alt="Partner 2 Logo" />
                <PartnerLogo src="/img/ChatGPT-Logo.jpg" alt="Partner 3 Logo" />
            </PartnersSection>
            <Location>123 Main St, Suite 100, City, State 12345</Location>
            <CNPJ>CNPJ 00.000.000/0001-00</CNPJ>
        </FooterSection>
    );
};

export default Footer;
