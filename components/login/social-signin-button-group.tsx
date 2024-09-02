import React from "react";
import SocialSigninButton from "./social-signin-button";
import { Chrome, Github } from "lucide-react";

const SocialSigninButtonGroup = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign in with
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <SocialSigninButton
          provider="github"
          icon={<Github size={18} color="#2a6edb" className="mr-2" />}
          label="Continue with GitHub"
        />
        <SocialSigninButton
          provider="google"
          icon={<Chrome size={18} color="#2a6edb" className="mr-2" />}
          label="Continue with Google"
        />
      </div>
    </>
  );
};

export default SocialSigninButtonGroup;
