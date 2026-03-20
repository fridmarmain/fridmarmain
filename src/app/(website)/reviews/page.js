import { client } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewGrid";
import "../../styles/reviews.css";
import ReviewGrid from "@/components/ReviewGrid";
import { generateSEO } from "@/lib/seo";

async function getReviews() {
  return await client.fetch(`*[_type == "review"] | order(_createdAt desc)`);
}

// ── Metadata for SEO ──
export async function generateMetadata() {
  return generateSEO({
    title: "Client Reviews",
    description:
      "Read testimonials and reviews from clients of Fridmar Professional Corporation, showcasing our commitment to excellence in legal services.",
    path: "/reviews",
    image: "/og-image.png",
    type: "website",
  });
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="page">
      <ReviewGrid reviews={reviews} />
      <a
        className="primarybtn"
        href="https://search.google.com/local/writereview?placeid=ChIJcekZwOovK4gR-EYjvQOz6jM"
        target="_blank"
      >
        <svg
          role="img"
          fill="#fff"
          viewBox="0 0 24 24"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Google</title>
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Leave us a Google Review
      </a>
    </main>
  );
}
