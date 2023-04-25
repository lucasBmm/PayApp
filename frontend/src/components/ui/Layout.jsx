import React from 'react';
import Footer from './Footer';
import styled from 'styled-components';
import NavigationBar from './Navbar';

const BodyContainer = styled.div`
    heigth: 100%;
`;

const Layout = ({children}) => {
    return (
        <>
            <NavigationBar />
            <BodyContainer>
                {children}
            </BodyContainer>
            <Footer />
        </>
    )
}

export default Layout;