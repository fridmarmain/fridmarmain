export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.png",
  type = "website",
}) {
  const baseUrl = "https://fridmar.com";
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title} | Fridmar Professional Corporation`;

  return {
    title: fullTitle, // ✅ browser tab title
    description,
    openGraph: {
      title: fullTitle, // ✅ matches exactly
      description,
      url,
      siteName: "Fridmar Professional Corporation",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle, // ✅ matches exactly
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
