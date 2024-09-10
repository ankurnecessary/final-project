import { auth } from '@/authentication/auth';
import SocialSigninButtonGroup from '@/components/login/socialSigninButtonGroup';
import Register from '@/components/register';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect('/');

  return (
    <div className="flex items-center justify-center bg-background md:min-h-[calc(100vh-4rem)]">
      <div className="my-5 w-full space-y-8 p-12 md:max-w-xl md:rounded-lg md:border md:shadow-lg">
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
