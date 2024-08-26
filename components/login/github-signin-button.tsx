import React from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { signIn } from "@/authentication/auth";

const GithubSigninButton = ({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button variant="outline" className="w-full" {...props}>
        {/* TODO: Because of glyphicon I am not able to convert this component into generic component for all the social buttons */}
        <Github size={18} color="#2a6edb" className="mr-2"/>
        Sign in with Github
      </Button>
    </form>
  );
};

export default GithubSigninButton;
