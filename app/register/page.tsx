import { auth } from "@/authentication/auth";
import Register from "@/components/Register/register";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Redirecting to home page if session is valid
  if (session) redirect("/");
  
  return (
    <Register />
  );
}
