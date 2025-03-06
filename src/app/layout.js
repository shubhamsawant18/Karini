import Navbar from "../components/Navbar";
import { ProductsProvider } from "../context/ProductsContext"; // ✅ Import the context provider
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductsProvider> {/* ✅ Wrap everything inside ProductsProvider */}
          <Navbar />
          {children} {/* ✅ This renders the page content */}
        </ProductsProvider>
      </body>
    </html>
  );
}
