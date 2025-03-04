"use client";


import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../app/styles/Navbar.css";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
          <Image src="/image/logo-chanel.png" alt="Logo" width={50} height={44} priority />
        </Link>
        <span className="brand-name">KARINI AI</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search for products..." />
        <button aria-label="Search">🔍</button>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
        ☰
      </button>

      <div className={`nav-section ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link href="/Home">Home</Link></li>
          <li><Link href="/Products">Products</Link></li>
          <li><Link href="/Cart">Cart</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="auth-buttons">
        <Link href="/login">
  <button className="login-btn">Login</button>
</Link>
        <Link href="/Signup">
          <button className="signup-btn" aria-label="Sign Up">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
