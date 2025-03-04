"use client"; // ✅ Fix for useState in Next.js

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../src/app/styles/Navbar.css"; // ✅ Correct Path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* ✅ Logo with Brand Name */}
      <div className="logo">
        <Link href="/">
          <Image src="/image/logo-chanel.png" alt="MyStore Logo" width={50} height={44} />
        </Link>
        <span className="brand-name">KARINI AI</span>
      </div>

      {/* ✅ Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for products..." />
        <button>🔍</button>
      </div>

      {/* ✅ Mobile Menu Toggle Button */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* ✅ Navigation and Auth in One Row (Collapsible in Mobile) */}
      <div className={`nav-section ${menuOpen ? "open" : ""}`}>
        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
