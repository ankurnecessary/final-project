import { redirect } from 'next/navigation';

const ErrorPage = () => {
  redirect('/login?error=authError');
};

export default ErrorPage;
