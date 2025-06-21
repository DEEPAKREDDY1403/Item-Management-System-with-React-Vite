import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const activeLinkStyle = {
        color: '#6366f1', // Indigo-500
        fontWeight: '700',
    };

    return (
        <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Item<span className="text-slate-800">Hub</span>
                </div>
                <div className="flex items-center space-x-8 text-base font-medium">
                    <NavLink
                        to="/view-items"
                        style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        className="text-slate-600 hover:text-indigo-500 relative transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-indigo-500 hover:after:w-full after:transition-all"
                    >
                        View Items
                    </NavLink>
                    <NavLink
                        to="/add-item"
                        style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        className="text-slate-600 hover:text-indigo-500 relative transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-indigo-500 hover:after:w-full after:transition-all"
                    >
                        Add Item
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
