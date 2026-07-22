import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AuthLayout } from "~/components/auth/AuthLayout";

export const Route = createFileRoute("/accept-invitation")({
  validateSearch: (search: Record<string, string>) => ({
    token: search.token || "",
  }),
  component: AcceptInvitationPage,
});

function AcceptInvitationPage() {
  const { token } = Route.useSearch();
  const [status, setStatus] = useState<"loading" | "invalid" | "needSignup" | "accepted">("loading");
  const [invitation, setInvitation] = useState<{
    companyName: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    fetch(`/api/team/accept?token=${encodeURIComponent(token)}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.invalid) {
          setStatus("invalid");
        } else if (data.needSignup) {
          setInvitation(data.invitation);
          setStatus("needSignup");
        } else if (data.ok) {
          setStatus("accepted");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  if (status === "loading") {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
            <svg className="h-6 w-6 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Checking invitation...</h1>
        </div>
      </AuthLayout>
    );
  }

  if (status === "invalid") {
    return (
      <AuthLayout>
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Invalid invitation</h1>
          <p className="text-sm text-gray-500">
            This invitation link is invalid or has expired.
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (status === "accepted") {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
            <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">You&apos;re in!</h1>
          <p className="text-sm text-gray-500">You have joined the team. Redirecting to dashboard...</p>
        </div>
      </AuthLayout>
    );
  }

  // Need signup
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">You&apos;ve been invited!</h1>
        <p className="mb-2 text-sm text-gray-500">
          {invitation?.companyName} has invited you as a <strong>{invitation?.role}</strong>.
        </p>
        <p className="mb-6 text-sm text-gray-500">
          Create your account to accept the invitation.
        </p>
        <a
          href={`/sign-up?invitation=${token}`}
          className="inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Create account
        </a>
      </div>
    </AuthLayout>
  );
}
