export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.png",
}) {
  const baseUrl = "https://fridmar.com";
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Fridmar Professional Corporation`,
      description,
      url,
      siteName: "Fridmar Professional Corporation",
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
      title: `${title} | Fridmar Professional Corporation`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
