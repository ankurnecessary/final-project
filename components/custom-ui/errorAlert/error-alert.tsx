import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../../ui/alert";

function ErrorAlert({
  description
}: {
  description: string;
}) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4 mt-[-4px]" />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
