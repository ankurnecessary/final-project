import React from 'react';
import SocialSigninButton from './socialSigninButton';
import { Chrome, Github } from 'lucide-react';

const SocialSigninButtonGroup = () => {
  return (
    <>
      <div className="relative md:hidden">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-black opacity-20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary bg-white text-xs leading-5">
            Or
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
