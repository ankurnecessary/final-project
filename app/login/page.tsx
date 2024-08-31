import Login from "@/components/Login/login";
import Link from "next/link";
import { auth } from "@/authentication/auth";
import { redirect } from "next/navigation";
import SocialSigninButtonGroup from "@/components/Login/social-signin-button-group";

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect("/");

  return (
    <div className="flex items-center justify-center md:min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-md w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12 my-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Sign up
            </Link>
          </p>
        </div>
        <Login />
        <SocialSigninButtonGroup />
      </div>
    </div>
  );
}
