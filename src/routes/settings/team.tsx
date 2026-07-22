import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

type Invitation = {
  id: number;
  email: string;
  role: string;
  acceptedAt: string | null;
  createdAt: string;
};

export const Route = createFileRoute("/settings/team")({
  component: TeamSettingsPage,
});

function TeamSettingsPage() {
  const [user, setUser] = useState<{ companyId: number } | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) { window.location.href = "/sign-in"; return; }
        return r.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          return fetch("/api/team/invitations");
        }
      })
      .then((r) => r?.json())
      .then((data) => {
        if (data?.invitations) setInvitations(data.invitations);
        setPageLoading(false);
      })
      .catch(() => { window.location.href = "/sign-in"; });
  }, []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send invitation");
        setLoading(false);
        return;
      }

      setMessage(`Invitation sent to ${email}`);
      setEmail("");
      setInvitations((prev) => [data.invitation, ...prev]);
    } catch {
      setError("Unable to connect");
    }
    setLoading(false);
  }

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - simplified for this page */}
      <aside className="hidden w-60 shrink-0 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <a href="/dashboard" className="text-xl font-bold text-brand-600">LeadRescue</a>
        </div>
        <nav className="p-3">
          <a href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            ← Back to Dashboard
          </a>
          <a href="/settings/team" className="mt-1 flex items-center gap-3 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
            Team
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-2xl font-bold text-gray-900">Team settings</h1>

          {/* Invite form */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Invite team members</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
              {message && <div className="rounded-lg bg-brand-50 p-3 text-sm text-brand-700">{message}</div>}

              <div className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-32 rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="owner">Owner</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Invite"}
                </button>
              </div>
            </form>
          </div>

          {/* Invitations list */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Invitations</h2>
            {invitations.length === 0 ? (
              <p className="text-sm text-gray-500">No invitations yet. Invite your first team member above.</p>
            ) : (
              <div className="space-y-2">
                {invitations.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inv.email}</div>
                      <div className="text-xs text-gray-500 capitalize">{inv.role}</div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      inv.acceptedAt ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {inv.acceptedAt ? "Accepted" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
