import React from 'react';
import HeaderContainer from '../components/Header/HeaderContainer';

export const withHeader = (Component) => {
    return (
        <>
            <HeaderContainer/>
            <Component />
        </>
    )
}
