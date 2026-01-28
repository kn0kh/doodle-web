"use client";

import Link from "next/link";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="error-wrapper">
      <h2 className="label-two">Something went wrong!</h2>
      <p>{error.message}</p>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn back-btn">
          Go back
        </Link>
      </div>
    </div>
  );
}
