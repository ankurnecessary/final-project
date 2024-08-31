import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/authentication/auth";

export default async function Component() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background shadow-m border border-x-0 border-t-0 fixed top-0 w-full">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Iconic</span>
      </Link>
      <div className="flex items-center gap-2">
        {!session && (
          <>
            <Link
              href="/login"
              className="px-4 py-[10px] text-sm font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-[10px] text-sm font-medium bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            >
              Sign Up
            </Link>
          </>
        )}
        {session && (
          <form
            action={async (formdata) => {
              "use server";
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
