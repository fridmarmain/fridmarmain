// layout.js (Server Component)
import { Bricolage_Grotesque, Google_Sans_Flex } from "next/font/google";
import "../styles/global.css";
import "../styles/footer.css";
import Navbar from "@/components/Navbar"; // Now you can import it!
import Footer from "@/components/Footer";
import Providers from "./Providers"; // We will move the progress bar here

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-a",
  display: "swap",
  adjustFontFallback: false, //
});
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-b",
  display: "swap",
  adjustFontFallback: false, //
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${googleSans.variable}`}>
      <body className="antialiased">
        {/* The Progress Bar needs a Client Component wrapper */}
        <Providers />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
