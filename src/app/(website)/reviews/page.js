import { client } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewGrid";
import "../../styles/reviews.css";
import ReviewGrid from "@/components/ReviewGrid";

async function getReviews() {
  return await client.fetch(`*[_type == "review"] | order(_createdAt desc)`);
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="page">
      <ReviewGrid reviews={reviews} />
      <a
        href="https://search.google.com/local/writereview?placeid=ChIJcekZwOovK4gR-EYjvQOz6jM"
        target="_blank"
      >
        Leave us a Google Review
      </a>
    </main>
  );
}
