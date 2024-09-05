import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const options = {
  providers: [
    GitHub,
    Google 
  ],
};