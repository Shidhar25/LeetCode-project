import React, { useState } from "react";
import { TbBrandLeetcode } from "react-icons/tb";
import { FiSearch, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login', { state: { isSignIn: true } });
  };

  const handleRegister = () => {
    navigate('/login', { state: { isSignIn: false } });
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMenu size={24} />
      </div>

      <Link to="/" className="navbar-logo">
        <TbBrandLeetcode size={28} color="#FFA116" />
        <span>LeetCode</span>
      </Link>
      
      <ul className="navbar-links">
        <li><Link to="/problems">Problems</Link></li>
        <li><Link to="/contest">Contest</Link></li>
        <li><Link to="/discuss">Discuss</Link></li>
        <li><Link to="/interview">Interview</Link></li>
        <li><Link to="/store">Store</Link></li>
      </ul>
      
      <div className="navbar-search">
        <input type="text" placeholder="Search questions..." />
        <FiSearch 
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8c8c8c'
          }}
        />
      </div>
      
      <div className="navbar-auth">
        <button onClick={handleSignIn}>Sign in</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </nav>
  );
};

export default NavBar;
