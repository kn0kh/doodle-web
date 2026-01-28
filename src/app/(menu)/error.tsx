"use client";

import Link from "next/link";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="menu error-wrapper">
      <h2 className="label-two">Something went wrong!</h2>
      <p>{error.message}</p>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <button
          className="btn back-btn"
          onClick={() => window.location.reload()}
          type="button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
