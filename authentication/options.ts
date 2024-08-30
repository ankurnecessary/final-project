import GitHubProvider, { GitHubProfile } from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      // profile function helps in setting the role for a profile
      profile(profile: GitHubProfile) {

        let userRole = "Github user";
        if (profile.email === "ankurnecessary@gmail.com") {
          userRole = "admin";
        }

        return { ...profile, id: profile.id.toString(), role: userRole };
      },
      clientId: process.env.AUTH_GITHUB_ID || '',
      clientSecret: process.env.AUTH_GITHUB_SECRET || '',
    }),
    Google 
  ],
};