import { handlers } from "@/authentication/auth"; // Referring to the auth.ts
export const { GET, POST } = handlers;
export const runtime = "edge"; // optional