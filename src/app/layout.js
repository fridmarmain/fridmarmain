import { Bricolage_Grotesque } from "next/font/google";
import "../styles/global.css"; // Your main styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/footer.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
