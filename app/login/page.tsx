import Login from '@/components/login';
import Link from 'next/link';
import { auth } from '@/authentication/auth';
import { redirect } from 'next/navigation';
import SocialSigninButtonGroup from '@/components/login/socialSigninButtonGroup';
import SocialAuthErrorAlert from '@/components/socialAuthErrorAlert';

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect('/');

  return (
    <div className="flex items-center justify-center bg-background md:min-h-[calc(100vh-4rem)]">
      <div className="my-5 w-full max-w-md space-y-8 p-12 md:max-w-3xl md:rounded-lg md:border md:shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Don&apos;t have an account?{' '}
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
          <div className="relative hidden w-16 items-stretch justify-center md:flex">
            <span className="absolute top-1/2 z-10 flex h-7 w-7 translate-y-[-50%] items-center justify-center rounded-full border border-primary bg-white text-xs leading-5">
              OR
            </span>
            <div className="border-r border-black opacity-20"></div>
          </div>
          <div className="mt-4 space-y-4 md:mt-3 md:flex-1">
            <SocialSigninButtonGroup />
          </div>
        </div>
      </div>
    </div>
  );
}
