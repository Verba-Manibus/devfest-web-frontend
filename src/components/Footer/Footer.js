import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Verba Manibus — Dự án dịch ngôn ngữ ký hiệu</p>
      </div>
    </footer>
  );
}

export default Footer;
