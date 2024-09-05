import Login from "@/components/login";
import Link from "next/link";
import { auth } from "@/authentication/auth";
import { redirect } from "next/navigation";
import SocialSigninButtonGroup from "@/components/login/socialSigninButtonGroup";
import SocialAuthErrorAlert from "@/components/socialAuthErrorAlert";

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect("/");

  return (
    <div className="flex items-center justify-center md:min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-md md:max-w-3xl w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12 my-5">
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
          <SocialAuthErrorAlert />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-1">
            <Login />
          </div>
          <div className="hidden md:flex justify-center items-stretch w-16 relative">
            <span className="absolute top-1/2 w-7 h-7 rounded-full flex items-center justify-center translate-y-[-50%] text-xs leading-5 border border-primary bg-white z-10">OR</span>
            <div className="border-r border-black opacity-20"></div>
          </div>
          <div className="space-y-4 mt-4 md:mt-3 md:flex-1">
            <SocialSigninButtonGroup />
          </div>
        </div>
      </div>
    </div>
  );
}
