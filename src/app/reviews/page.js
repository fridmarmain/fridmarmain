import { client } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewGrid";
import "../../styles/reviews.css";

async function getReviews() {
  return await client.fetch(`*[_type == "review"] | order(_createdAt desc)`);
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="reviews-page">
      <section className="reviews-header">
        <div className="inner-container">
          <h1>Client Success Stories</h1>
          <p>
            Real experiences from the people weve represented across Ontario.
          </p>
        </div>
      </section>

      <section className="reviews-grid-container">
        <div className="inner-container masonry-grid">
          {reviews.map((rev, index) => (
            <ReviewCard key={rev._id} review={rev} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
