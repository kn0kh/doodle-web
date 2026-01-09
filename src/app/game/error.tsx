"use client";

import { useRouter } from "next/navigation";

export default function ErrorBoundary({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <>
      <div>{error.message}</div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Exit
      </button>
    </>
  );
}
