"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { getPaginatedPosts } from "@/lib/sanity";
import BlogCard from "@/components/BlogCard";
import * as Icon from "lucide-react";
import "../styles/resourceGrid.css";

export default function ResourceGrid({
  initialCategory = null,
  allCategories = [],
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const postsRef = useRef(posts);

  // Keep ref in sync so loadMore can read latest posts without stale closure
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const loadPosts = useCallback(
    async (reset = false) => {
      setLoading(true);

      const currentPosts = reset ? [] : postsRef.current;
      const lastDate =
        currentPosts[currentPosts.length - 1]?.publishedAt ?? null;

      try {
        const newPosts = await getPaginatedPosts(
          lastDate,
          activeCategory,
          search,
          sortBy,
        );
        setHasMore(newPosts.length >= 6);
        setPosts(reset ? newPosts : [...currentPosts, ...newPosts]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [search, activeCategory, sortBy],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      loadPosts(true);
    }, 300);
    return () => clearTimeout(handler);
  }, [search, activeCategory, sortBy, loadPosts]);

  return (
    <div className="resource-container">
      <div className="filter-controls">
        <div className="search-wrapper">
          <Icon.Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="sort-toggle-group">
          <button
            className={`sort-btn ${sortBy === "desc" ? "active" : ""}`}
            onClick={() => setSortBy("desc")}
          >
            <Icon.Clock size={14} /> Newest
          </button>
          <button
            className={`sort-btn ${sortBy === "asc" ? "active" : ""}`}
            onClick={() => setSortBy("asc")}
          >
            <Icon.History size={14} /> Oldest
          </button>
        </div>
      </div>

      {!initialCategory && (
        <div className="category-tabs">
          <button
            className={!activeCategory ? "tab active" : "tab"}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat.slug}
              className={activeCategory === cat.slug ? "tab active" : "tab"}
              onClick={() => setActiveCategory(cat.slug)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      <div className="resource-grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {loading && (
        <div className="status-message">
          <div className="spinner"></div>
          <p>Fetching resources...</p>
        </div>
      )}

      {hasMore && !loading && posts.length > 0 && (
        <div className="load-more-wrapper">
          <button className="btn-load-more" onClick={() => loadPosts(false)}>
            Load More Content
          </button>
        </div>
      )}
    </div>
  );
}
