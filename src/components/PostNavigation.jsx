"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./postNavigation.css";

export default function PostNavigation({ previousPost, nextPost }) {
  return (
    <div className="post-navigation">
      <div className="nav-button-wrapper">
        {previousPost ? (
          <Link
            href={`/resources/${previousPost.slug}`}
            className="nav-button prev"
          >
            <ChevronLeft size={20} />
            <div className="nav-content">
              <span className="nav-label">Previous</span>
              {/* <span className="nav-title">{previousPost.title}</span> */}
            </div>
          </Link>
        ) : (
          <div className="nav-button prev disabled">
            <ChevronLeft size={20} />
            <div className="nav-content">
              <span className="nav-label">Previous</span>
              {/* <span className="nav-title">No previous post</span> */}
            </div>
          </div>
        )}
      </div>

      <div className="nav-button-wrapper">
        {nextPost ? (
          <Link
            href={`/resources/${nextPost.slug}`}
            className="nav-button next"
          >
            <div className="nav-content">
              <span className="nav-label">Next</span>
              {/* <span className="nav-title">{nextPost.title}</span> */}
            </div>
            <ChevronRight size={20} />
          </Link>
        ) : (
          <div className="nav-button next disabled">
            <div className="nav-content">
              <span className="nav-label">Next</span>
              {/* <span className="nav-title">No next post</span> */}
            </div>
            <ChevronRight size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
