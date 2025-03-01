"use client";

// shadcn/ui components
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";

// React and Next.js imports
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

// Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Ensure the environment variable is accessible
// Replace "YOUR_SITE_KEY_HERE" with your actual Site Key
const SITE_KEY = "6LcPG-YqAAAAAI98ubN_Np9jQBF-_S50dHgpe5zZ";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    setPending(true);
    setError(null); // Clear previous errors
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: captchaToken }), // Updated key to match server
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push("/sign-in");
      } else {
        setError(data.message || "An error occurred during sign up.");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setPending(false);
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    provider: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-white ml-7">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground text-white ml-7">
            Use email or service to create an account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={pending}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />

            {/* Google reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                theme="light" // Optional: "light" or "dark"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {pending ? "Submitting..." : "Continue"}
            </button>
          </form>

          <Separator />
          <div className="flex my-2 justify-evenly items-center">
            <Button
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            >
              <FcGoogle size={24} />
            </Button>
            <Button
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            >
              <FaGithub size={24} />
            </Button>
          </div>
          <p className="text-white ml-7">
            Already have an account?
            <Link
              className="text-sky-700 ml-2 hover:underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
