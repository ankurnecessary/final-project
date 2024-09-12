import React from 'react';
import { Button } from '../ui/button';
import { signIn } from '@/authentication/auth';

const SocialSigninButton = ({
  provider,
  label,
  icon,
  ...props
}: {
  provider?: string;
  label: string;
  icon: React.JSX.Element;
} & React.ComponentPropsWithRef<typeof Button>) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider, { redirectTo: '/chat' });
      }}
    >
      <Button variant="outline" className="w-full bg-slate-50" {...props}>
        {icon}
        {label}
      </Button>
    </form>
  );
};

export default SocialSigninButton;
