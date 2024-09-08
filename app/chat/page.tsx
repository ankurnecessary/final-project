import { auth } from '@/authentication/auth';
import SessionData from '@/components/sessionData';
import { redirect } from 'next/navigation';
import React from 'react';

const ChatPage = async () => {
  const session = await auth();

  // Redirecting to login page if session is invalid
  if(!session) redirect('/login');

  return (
    <div>
      <SessionData session={session} />
    </div>
  );
};

export default ChatPage;
