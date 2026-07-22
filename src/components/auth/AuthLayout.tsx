import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a href="/" className="inline-block">
            <span className="text-2xl font-bold text-brand-600">LeadRescue</span>
          </a>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          {children}
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LeadRescue. All rights reserved.
        </p>
      </div>
    </div>
  );
}
