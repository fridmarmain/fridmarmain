import { Bricolage_Grotesque, Google_Sans_Flex } from "next/font/google";
import "../styles/global.css";
import "../styles/footer.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./Providers";
import Script from "next/script";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-a",
  display: "swap",
  adjustFontFallback: false,
});

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-b",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  metadataBase: new URL("https://fridmar.com"),
  title: {
    default: "Fridmar Professional Corporation | Construction Industry Lawyers",
    template: "%s | Fridmar Professional Corporation",
  },
  verification: {
    google: "lWWoIt_YoFGuVxXX0AA1l3_t7KVrRZzpHBuMUklGdCU",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  description:
    "Fridmar Professional Corporation provides expert legal services in construction law, bankruptcy law, real estate litigation, and civil & commercial litigation in Ontario.",
  keywords: [
    "construction lawyer Ontario",
    "construction law Toronto",
    "bankruptcy lawyer Ontario",
    "real estate litigation",
    "civil litigation Ontario",
    "Fridmar Professional Corporation",
    "Dan Fridmar lawyer",
    "construction industry legal advice",
  ],
  authors: [{ name: "Fridmar Professional Corporation" }],
  creator: "Fridmar Professional Corporation",
  publisher: "Fridmar Professional Corporation",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://fridmar.com",
    siteName: "Fridmar Professional Corporation",
    title: "Fridmar Professional Corporation | Construction Industry Lawyers",
    description:
      "Expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial litigation in Ontario.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fridmar Professional Corporation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fridmar Professional Corporation | Construction Industry Lawyers",
    description:
      "Expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial litigation in Ontario.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fridmar.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${googleSans.variable}`}>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9WN725GQPR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9WN725GQPR');
          `}
        </Script>
      </body>
    </html>
  );
}
