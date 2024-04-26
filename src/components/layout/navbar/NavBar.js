import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CgUser, CgMenuRight as AlignJustify } from 'react-icons/cg';
import AuthService from '../../../services/AuthService';

function NavBar() {
    const hover = "hover:text-submain";
    const hoverActive = "hover:text-submain";
    const [showAdminLinks, setShowAdminLinks] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
    const [userEmail, setUserEmail] = useState('');
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const user = AuthService.getUser();
        if (user) {
            setUserEmail(user.email);
            setUserRoles(user.roles);
        }
    }, []);

    const hasAdminRole = () => {
        return userRoles.includes('Creator');
    };

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setUserEmail('');
        setUserRoles([]);
        window.location.href = '/categories';
    };

    return (
        <nav className="w-full flex justify-between h-20 items-center px-5 lg:px-32 bg-main text-white sticky top-0 z-50">
            <Link to="/">
                <img src="/images/logo.png" alt="logo" className="h-12" />
            </Link>
            <AlignJustify 
                size={24} 
                className="block lg:hidden hover:opacity-80 transition cursor-pointer" 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
            {showMobileMenu && (
                <div className="lg:hidden fixed top-16 left-0 w-full bg-dry py-4 z-50">
                    <ul className="text-center">
                        <li>
                            <NavLink 
                                to="/categories" 
                                className="block py-2 text-white hover:text-submain" 
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Categories
                            </NavLink>
                        </li>
                        {hasAdminRole() && (
                            <li>
                                <NavLink
                                    to="/admin/categories"
                                    className="block py-2 text-white hover:text-submain"
                                    onClick={() => {
                                        setShowAdminLinks(!showAdminLinks);
                                        setShowMobileMenu(false);
                                    }}
                                >
                                    Admin
                                </NavLink>
                            </li>
                        )}
                        {isLoggedIn ? (
                            <li>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setShowMobileMenu(false);
                                    }} 
                                    className="block py-2 text-white w-full cursor-pointer hover:text-submain"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink 
                                    to="/login" 
                                    className="block py-2 text-white hover:text-submain" 
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            )}
            <ul className="hidden lg:flex items-center justify-center gap-7">
                <li>
                    <NavLink to="/categories" className={hover}>
                        Categories
                    </NavLink>
                </li>
                {hasAdminRole() && (
                    <li>
                        <NavLink
                            to="/admin/categories"
                            className={`bg-submain rounded-md px-8 py-2`}
                            onClick={() => setShowAdminLinks(!showAdminLinks)}
                        >
                            Admin
                        </NavLink>
                    </li>
                )}
                {isLoggedIn ? (
                    <li className="flex items-center">
                        <span className="mr-2">{userEmail}</span>
                        <button onClick={handleLogout} className={hover + " cursor-pointer"}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/login" className={hover}>
                            <CgUser className="w-8 h-8" />
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
