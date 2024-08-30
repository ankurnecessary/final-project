import React from "react";
import SocialSigninButton from "./social-signin-button";
import { Chrome, Github } from "lucide-react";

const SocialSigninButtonGroup = () => {
  return (
    <div className="space-y-2">
      <SocialSigninButton
        provider="github"
        icon={<Github size={18} color="#2a6edb" className="mr-2" />}
        label="Sign in with GitHub"
      />
      <SocialSigninButton
        provider="google"
        icon={<Chrome size={18} color="#2a6edb" className="mr-2" />}
        label="Sign in with Google"
      />
    </div>
  );
};

export default SocialSigninButtonGroup;
