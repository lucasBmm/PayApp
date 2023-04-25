import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from './Navbar';
import ScrollTrigger from 'react-scroll-trigger';
import Footer from './Footer';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideFromLeft = keyframes`
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
  animation-duration: 2s;
`;

const slideFromRight = keyframes`
  0% { transform: translateX(50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
  animation-duration: 2s;
`;

const slideFromBottom = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
  animation-duration: 2s;
`;

const Hero = styled.section`
    background-image: url('/img/hero.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 1s ease;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: white;
  max-width: 80%;
  margin: 0 auto;
`;

const StartButton = styled.button`
  background-color: black;
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem 1.6rem;
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;
`;

const InfoSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 4rem 0;
`;

const InfoBlock = styled.div`
  flex: 0 1 20%;
  padding: 5rem 1rem;
  text-align: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 1rem;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 1rem 0;
`;

const PartnerImage = styled.img`
  display: inline-block;
  height: 100px;
  margin: 0 1rem;
  object-fit: contain;
`;

const Section = styled.section`
  padding: 4rem 1rem;
  height: 60vh;
  text-align: center;
  background-color: ${({ bgColor }) => bgColor || 'white'};
  animation: ${({ animation }) => animation || fadeIn} 1s ease;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: center;

  &:nth-child(even) {
    background-color: #f5f5f5;
  }

  @media (min-width: 768px) {
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: space-between;
  }
`;

const SectionImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
  margin: 1rem;

  @media (min-width: 768px) {
    flex: 0 1 calc(50% - 2rem);
  }
`;

const SectionContent = styled.div`
  @media (min-width: 768px) {
    flex: 0 1 calc(50% - 2rem);
  }
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const ImageGridItem = styled.div`
  flex: 0 1 calc(50% - 1rem);
  margin: 0.5rem;
  position: relative;

  @media (min-width: 768px) {
    flex: 0 1 calc(33% - 1rem);
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
`;

const GridText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 0 0 5px 5px;
  font-size: 1rem;
`;

const ImageBackgroundSection = styled.section`
  padding: 4rem 1rem;
  height: 40vh;
  text-align: center;
  background-image: url('/img/hero.jpg');
  background-size: cover;
  background-position: center;
  color: white;
`;

const AnimatedImageBackgroundSection = styled(ImageBackgroundSection)`
  animation: ${({ animation }) => animation || ''};
`;

const RegistrationSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  position: relative;
`;

const RegistrationTextSection = styled.section`
  z-index: 10;
  text-align: center;
`;

const RegistrationHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const RegistrationText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const RegisterButton = styled.button`
  background-color: #1877f2;
  color: white;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #155eaf;
  }
`;

const PhoneImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 5%;
  height: 90%;
  z-index: -10;
`;

const Homepage = () => {
    const partners = [
        'img/ChatGPT-Logo.jpg',
        'img/GitHub.png',
        'img/react.png',
        // Add more partner image paths...
    ];

    const [animation1, setAnimation1] = React.useState('');
    const [animation2, setAnimation2] = React.useState('');
    const [animation3, setAnimation3] = React.useState('');
    const [imageAnimation, setImageAnimation] = React.useState('');

    const onEnter = (setAnimation) => {
        setAnimation(slideFromLeft);
    };

    const onEnterRight = (setAnimation) => {
        setAnimation(slideFromRight);
    }

    const onEnterFade = (setAnimation) => {
        setAnimation(fadeIn);
    }

    const onExit = (setAnimation) => {
        setAnimation('');
    };

    return (
        <>
            <Hero>
                <AboutText>
                    Welcome to our payment app. We make saving and managing your money simple and secure.
                </AboutText>
                <StartButton>Start saving your money</StartButton>
            </Hero>
            <InfoSection>
                <InfoBlock>
                    <InfoIcon icon={faLock} />
                    <h2>Secure</h2>
                    <p>Our app provides top-notch security to keep your money safe and secure.</p>
                </InfoBlock>
                <InfoBlock>
                    <InfoIcon icon={faUser} />
                    <h2>Easy to Use</h2>
                    <p>Our user-friendly interface makes managing your finances a breeze.</p>
                </InfoBlock>
                <InfoBlock>
                    <InfoIcon icon={faPiggyBank} />
                    <h2>Save Money</h2>
                    <p>Take advantage of our features to save and grow your money effortlessly.</p>
                </InfoBlock>
            </InfoSection>
            <ScrollTrigger onEnter={() => onEnter(setAnimation1)} onExit={() => onExit(setAnimation1)}>
                <Section animation={animation1}>
                    <SectionImage src="/img/easy-to-use.jpg" alt="Easy to Use" />
                    <SectionContent>
                        <SectionHeading>Easy to Use</SectionHeading>
                        <SectionText>
                            Our app is designed with simplicity and user-friendliness in mind. Easily manage your finances and savings, even if you're new to personal finance apps.
                        </SectionText>
                    </SectionContent>
                </Section>
            </ScrollTrigger>
            <ScrollTrigger onEnter={() => onEnterRight(setAnimation2)} onExit={() => onExit(setAnimation2)}>
                <Section flexDirection="row-reverse" animation={animation2}>
                    <SectionImage src="/img/innovative-solutions.jpg" alt="Innovative Solutions" />
                    <SectionContent>
                        <SectionHeading>Innovative Solutions</SectionHeading>
                        <SectionText>
                            We are constantly improving our app with the latest technology and features to help you save more and make smarter financial decisions.
                        </SectionText>
                    </SectionContent>
                </Section>
            </ScrollTrigger>
            <ScrollTrigger onEnter={() => onEnter(setAnimation3)} onExit={() => onExit(setAnimation3)}>
                <Section animation={animation3}>
                    <SectionImage src="/img/for-everyone.jpg" alt="For Everyone" />
                    <SectionContent>
                        <SectionHeading>For Everyone</SectionHeading>
                        <SectionText>
                            Our app is designed for people from all walks of life. Whether you're a student, professional, or retiree, our app can help you reach your financial goals.
                        </SectionText>
                    </SectionContent>
                </Section>
            </ScrollTrigger>
            <ScrollTrigger onEnter={() => onEnterFade(setImageAnimation)} onExit={() => onExit(setImageAnimation)}>
                <AnimatedImageBackgroundSection animation={imageAnimation}>
                    <SectionHeading>Innovative Solutions</SectionHeading>
                    <SectionText>
                        We are constantly improving our app with the latest technology and features to help you save more and make smarter financial decisions.
                    </SectionText>
                </AnimatedImageBackgroundSection>
            </ScrollTrigger>
            <RegistrationSection>
                <RegistrationTextSection>
                    <RegistrationHeading>Start Saving Today</RegistrationHeading>
                    <RegistrationText>Join our community of savvy savers and take control of your finances today.</RegistrationText>
                    <RegisterButton>Register Now</RegisterButton>
                </RegistrationTextSection>
                <PhoneImage src="/img/phone.webp" alt="Homepage" />
            </RegistrationSection>s
        </>
    );
};

export default Homepage;  
