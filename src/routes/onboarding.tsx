import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const INDUSTRIES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Cleaning",
  "Pest Control",
  "Handyman / Home Repair",
  "IT Services",
  "Other",
];

const DEFAULT_STAGES = [
  "New Lead",
  "Attempted Contact",
  "Contacted",
  "Appointment Scheduled",
  "Estimate Sent",
  "Follow-Up Due",
  "Won",
  "Lost",
];

type StepData = {
  industry: string;
  employeeCount: string;
  typicalLeadValue: string;
  phone: string;
  timezone: string;
  stages: string[];
};

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StepData>({
    industry: "",
    employeeCount: "",
    typicalLeadValue: "",
    phone: "",
    timezone: "America/Chicago",
    stages: [...DEFAULT_STAGES],
  });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof StepData>(key: K, value: StepData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function removeStage(index: number) {
    setData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));
  }

  function moveStage(index: number, direction: "up" | "down") {
    setData((prev) => {
      const stages = [...prev.stages];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= stages.length) return prev;
      [stages[index], stages[newIndex]] = [stages[newIndex], stages[index]];
      return { ...prev, stages };
    });
  }

  async function handleFinish() {
    setSubmitting(true);
    try {
      const body = JSON.stringify({
        industry: data.industry,
        employeeCount: data.employeeCount,
        typicalLeadValue: data.typicalLeadValue ? parseFloat(data.typicalLeadValue) : undefined,
        phone: data.phone,
        timezone: data.timezone,
        stages: data.stages,
      });
      const res = await fetch("/api/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (res.ok) {
        window.location.href = "/dashboard";
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-brand-600">LeadRescue</span>
          <p className="mt-2 text-sm text-gray-500">Let&apos;s get you set up</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-brand-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          {/* Step 1: Company Profile */}
          {step === 1 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-gray-900">Company profile</h2>
              <p className="mb-6 text-sm text-gray-500">Tell us about your business</p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Industry</label>
                  <select
                    value={data.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white"
                  >
                    <option value="">Select...</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Team size</label>
                  <select
                    value={data.employeeCount}
                    onChange={(e) => update("employeeCount", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="1">Just me</option>
                    <option value="2-5">2–5</option>
                    <option value="6-15">6–15</option>
                    <option value="16+">16+</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Typical lead value ($)
                  </label>
                  <input
                    type="number"
                    value={data.typicalLeadValue}
                    onChange={(e) => update("typicalLeadValue", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                    placeholder="e.g. 2500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-gray-900">Personal info</h2>
              <p className="mb-6 text-sm text-gray-500">Your contact details</p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Timezone</label>
                  <select
                    value={data.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white"
                  >
                    <option value="America/New_York">Eastern (ET)</option>
                    <option value="America/Chicago">Central (CT)</option>
                    <option value="America/Denver">Mountain (MT)</option>
                    <option value="America/Los_Angeles">Pacific (PT)</option>
                    <option value="America/Anchorage">Alaska</option>
                    <option value="Pacific/Honolulu">Hawaii</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Pipeline Setup */}
          {step === 3 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-gray-900">Pipeline setup</h2>
              <p className="mb-6 text-sm text-gray-500">
                Customize your lead stages — drag to reorder, remove what you don&apos;t need
              </p>
              <div className="space-y-2">
                {data.stages.map((stage, i) => (
                  <div
                    key={`${stage}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={() => moveStage(i, "up")}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs leading-none"
                        aria-label="Move up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        disabled={i === data.stages.length - 1}
                        onClick={() => moveStage(i, "down")}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-xs leading-none"
                        aria-label="Move down"
                      >
                        ▼
                      </button>
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-800">{stage}</span>
                    <button
                      type="button"
                      onClick={() => removeStage(i)}
                      className="rounded p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label={`Remove ${stage}`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-gray-900">Review &amp; finish</h2>
              <p className="mb-6 text-sm text-gray-500">Here&apos;s a summary of your setup</p>
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Industry</span>
                  <span className="font-medium">{data.industry || "Not set"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Team size</span>
                  <span className="font-medium">{data.employeeCount || "Not set"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Typical lead value</span>
                  <span className="font-medium">
                    {data.typicalLeadValue ? `$${data.typicalLeadValue}` : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Timezone</span>
                  <span className="font-medium">{data.timezone}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <span className="text-sm text-gray-500">Pipeline stages ({data.stages.length})</span>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {data.stages.map((s) => (
                      <span key={s} className="rounded bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                disabled={submitting}
                className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 disabled:opacity-50"
              >
                {submitting ? "Finishing up..." : "Complete setup — take me to my dashboard"}
              </button>
            </>
          )}

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
