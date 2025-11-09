import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="site-title">Verba Manibus</h1>
        <nav className="main-nav">
          <Link to="/" className="nav-link">Trang giới thiệu</Link>
          <Link to="/features" className="nav-link">Tính năng</Link>
          <Link to="/translator" className="nav-link">Phiên dịch Real-time</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
