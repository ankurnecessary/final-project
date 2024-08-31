import { auth } from "@/authentication/auth";
import SocialSigninButtonGroup from "@/components/Login/social-signin-button-group";
import Register from "@/components/Register/register";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect("/");

  return (
    <div className="flex items-center justify-center md:min-h-[calc(100vh-4rem)] bg-background">
      <div className="md:max-w-xl w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12 my-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome!</h2>
          <p className="mt-2 text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <Register />
        <SocialSigninButtonGroup />
      </div>
    </div>
  );
}
