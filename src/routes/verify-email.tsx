import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthLayout } from "~/components/auth/AuthLayout";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, string>) => ({
    token: search.token || "",
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { token } = Route.useSearch();
  const [status, setStatus] = useState<"verifying" | "verified" | "error">("verifying");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    // Auto-verify: just simulate and redirect
    const timer = setTimeout(() => {
      setStatus("verified");
      setTimeout(() => {
        window.location.href = "/onboarding";
      }, 2000);
    }, 1500);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthLayout>
      <div className="text-center">
        {status === "verifying" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
              <svg className="h-6 w-6 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Verifying your email</h1>
            <p className="text-sm text-gray-500">Just a moment...</p>
          </>
        )}

        {status === "verified" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
              <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Email verified!</h1>
            <p className="text-sm text-gray-500">Welcome aboard. Redirecting you to setup...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Invalid link</h1>
            <p className="text-sm text-gray-500">This verification link is invalid or missing a token.</p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
