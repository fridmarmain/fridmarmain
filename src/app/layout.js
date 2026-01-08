import { Bricolage_Grotesque, Google_Sans_Flex } from "next/font/google";
import "../styles/global.css"; // Your main styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/footer.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-b",
  display: "swap",
  // You don't need to specify weights for Flex fonts,
  // Next.js handles the variable range automatically.
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${googleSans.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
