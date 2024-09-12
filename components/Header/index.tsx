import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/authentication/auth';

export default async function Component() {
  const session = await auth();
  return (
    <header className="shadow-m fixed top-0 flex w-full items-center justify-between border border-x-0 border-t-0 bg-background px-4 py-3">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Iconic</span>
      </Link>
      <div className="flex items-center gap-2">
        {!session && (
          <>
            <Link
              href="/login"
              className="rounded-md bg-primary px-4 py-[10px] text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-primary px-4 py-[10px] text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign Up
            </Link>
          </>
        )}
        {session && (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button
              variant="outline"
              className="px-4 py-2 text-sm font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        )}
      </div>
    </header>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
