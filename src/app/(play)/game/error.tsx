"use client";

import Link from "next/link";

export default function ErrorBoundary() {
  return (
    <div className="center-flex">
      <h2 className="label-two">Something went wrong!</h2>
      <p>An unexpected error occurred. Please try again.</p>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn back-btn">
          Go back
        </Link>
      </div>
    </div>
  );
}
