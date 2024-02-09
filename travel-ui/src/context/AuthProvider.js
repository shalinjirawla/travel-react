import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [currUserData, setCurrUserData] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 481);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
    const [rsWidths, setRsWidths] = useState({
        is1300: window.innerWidth <= 1300,
        is1200: window.innerWidth <= 1200,
        is1100: window.innerWidth <= 1100,
        is930: window.innerWidth <= 930,
        is620: window.innerWidth <= 620,
    });

    const checkAndSetAllValues = () => {
        if (localStorage.getItem('token')) {
            setUser(localStorage.getItem('token'));
            setUserId(localStorage.getItem('userId'));
            setIsLoading(false);
        } else {
            // message.error('Session is expired - Please make a new login request');
            setTimeout(() => {
                setUser(null);
                setUserId('');
                setIsLoading(false);
                setPermissions([]);
            }, 500);
        }
    };

    useEffect(() => {
        const ac = new AbortController();
        checkAndSetAllValues();
        return () => ac.abort();
    }, [isAuth]);

    useEffect(() => {
        checkAndSetAllValues();
    }, []);

    if (isLoading) {
        return "Loading";
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userId,
                setUserId,
                isAuth,
                setIsAuth,
                permissions,
                setPermissions,
                currUserData,
                setCurrUserData,
                currentRole,
                setCurrentRole,
                isMobile,
                setIsMobile,
                isTablet,
                setIsTablet,
                isDesktop,
                setIsDesktop,
                rsWidths,
                setRsWidths
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;