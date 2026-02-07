import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Joinex ",
  description: "Master SQL solving mysteries",
};

export default function RootLayout({ children ,}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white">
        <Navbar />  
        {children}
        <Footer />
      </body>
    </html>
  );
}