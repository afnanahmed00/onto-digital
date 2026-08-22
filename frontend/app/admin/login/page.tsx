"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowUpRight, Lock, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import Logo from "@/components/ui/Logo";
import AdminLoadingScreen from "@/components/admin/AdminLoadingScreen";
import { useAdminAuth } from "@/context/AdminAuthContext";

/**
 * POST /api/v1/auth/login via useAdminAuth().login() — see
 * services/adminAuth.ts. The backend sets the session as an httpOnly
 * cookie on its own response; this page never sees or stores a token.
 */
export default function AdminLoginPage() {
  const { status, login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in (e.g. cookie still valid from a previous visit) —
  // skip the form entirely.
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const result = await login(email.trim(), password);

    if (result.success) {
      router.replace("/admin");
      return;
    }

    setError(result.message ?? "Invalid email or password.");
    setIsSubmitting(false);
  };

  if (status === "loading" || status === "authenticated") {
    return <AdminLoadingScreen label="Checking session…" />;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-5 py-16">
      <div className="w-full max-w-[26rem] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Logo />

          <span className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
            Admin Access
          </span>

          <h1 className="mt-3 text-2xl font-semibold uppercase text-white sm:text-[1.75rem]">
            Sign In
          </h1>

          <p className="mt-2 text-sm leading-[1.7] text-[var(--text-secondary)]">
            Sign in to manage ONTO DIGITAL&apos;s projects, services, and leads.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            icon={Mail}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            invalid={Boolean(error)}
          />

          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            icon={Lock}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            invalid={Boolean(error)}
          />

          <Button type="submit" variant="outline" disabled={isSubmitting} className="mt-2 w-full">
            {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
            <ArrowUpRight size={16} />
          </Button>

          {error && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-[#FF5C5C]/35 bg-[#FF5C5C]/[0.06] px-4 py-3 text-[0.82rem] leading-[1.6] text-[#FF5C5C]"
            >
              <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
