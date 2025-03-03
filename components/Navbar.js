import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image
import "../src/app/styles/Navbar.css"; // ✅ Correct Path

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* ✅ Logo with Text */}
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

      {/* ✅ Navigation Links + Login/Signup */}
      <div className="nav-container">
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* ✅ Login & Signup Buttons */}
        <div className="auth-buttons">
          <Link href="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link href="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
