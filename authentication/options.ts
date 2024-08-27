import GitHubProvider, { GitHubProfile } from "next-auth/providers/github";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile: GitHubProfile) {
        console.log("Github profile: ", profile);

        let userRole = "Github user";
        if (profile.email === "ankurnecessary@gmail.com") {
          userRole = "admin";
        }

        return { ...profile, id: profile.id.toString(), role: userRole };
      },
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  ],
  callbacks: {
    async redirect({url, baseUrl}:{url:string, baseUrl: string}): Promise<string>{
      if(url === baseUrl + '/') url = baseUrl + "/test";
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  }
};