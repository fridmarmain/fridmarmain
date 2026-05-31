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
  const globalSchema = [
    // Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Fridmar",
      url: "https://fridmar.com/",
      logo: "https://fridmar.com/_next/static/media/logo.208b795d.png",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61575084998241",
        "https://www.instagram.com/fridmarlaw/",
        "https://ca.linkedin.com/company/fridmar-professional-corporation",
      ],
    },
    // WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Fridmar",
      url: "https://fridmar.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://fridmar.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    // LegalService
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Fridmar Professional Corporation",
      alternateName: "FPC",
      url: "https://fridmar.com/",
      description:
        "Fridmar Professional Corporation is a boutique law firm providing sophisticated legal support to the construction industry. The firm focuses on Construction Law, Bankruptcy Law, Real Estate Litigation, and General Litigation services for contractors, developers, and trades.",
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Dan Fridmar",
      },
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
      serviceType: [
        "Construction Law",
        "Bankruptcy Law",
        "Real Estate Litigation",
        "General Litigation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Legal Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Construction Law Services",
              description:
                "Legal representation and advocacy for contractors, developers, and trades in construction-related matters.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bankruptcy Law Services",
              description:
                "Legal support and representation for bankruptcy-related matters connected to business operations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Real Estate Litigation",
              description:
                "Legal assistance for disputes and litigation related to real estate and property matters.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "General Litigation",
              description:
                "Comprehensive litigation services incidental to the construction industry and business operations.",
            },
          },
        ],
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61575084998241",
        "https://www.instagram.com/fridmarlaw/",
        "https://ca.linkedin.com/company/fridmar-professional-corporation",
      ],
    },
    // FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What legal services does Fridmar Professional Corporation provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fridmar Professional Corporation provides legal services in Construction Law, Bankruptcy Law, Real Estate Litigation, and General Litigation related to the construction industry.",
          },
        },
        {
          "@type": "Question",
          name: "Who does Fridmar Professional Corporation represent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The firm represents contractors, developers, trades, and businesses involved in the construction industry.",
          },
        },
        {
          "@type": "Question",
          name: "When was Fridmar Professional Corporation established?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fridmar Professional Corporation was established in 2020 by founder and principal lawyer Dan Fridmar.",
          },
        },
        {
          "@type": "Question",
          name: "What is Fridmar Professional Corporation's primary area of focus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The firm's primary focus is Construction Law, offering specialized legal support and advocacy to the construction industry.",
          },
        },
        {
          "@type": "Question",
          name: "Does Fridmar Professional Corporation handle real estate disputes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the firm provides legal representation for Real Estate Litigation and related disputes.",
          },
        },
        {
          "@type": "Question",
          name: "Does the firm provide litigation services beyond construction law?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Fridmar Professional Corporation also handles General Litigation matters that are incidental to the construction industry and business operations.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en" className={`${bricolage.variable} ${googleSans.variable}`}>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>

        {/* Google Analytics */}
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

        {/* Structured Data / JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </body>
    </html>
  );
}
