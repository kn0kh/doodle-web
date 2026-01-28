"use client";

export default function ErrorBoundary() {
  return (
    <div className="menu center-flex">
      <h2 className="label-two">Something went wrong!</h2>
      <p>An unexpected error occurred. Please try again.</p>
      <div className="btn-wrapper" style={{ marginTop: "2rem" }}>
        <button
          className="btn back-btn"
          onClick={() => window.location.reload()}
          type="button"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
