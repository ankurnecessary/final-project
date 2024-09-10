import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Alert, AlertDescription } from '../../ui/alert';

function ErrorAlert({ description }: { description: string }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="mt-[-4px] h-4 w-4" />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
