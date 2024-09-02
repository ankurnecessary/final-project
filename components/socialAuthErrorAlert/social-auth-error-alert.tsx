"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ErrorAlert from "../custom-ui/errorAlert/error-alert";

const SocialAuthErrorAlert = () => {
  const isAuthError = useSearchParams()?.get("error") === "authError";
  return (
    <>
      {isAuthError && (
        <div className="mt-2">
          <ErrorAlert description="We couldn’t sign you in. Please try again." />
        </div>
      )}
    </>
  );
};

export default SocialAuthErrorAlert;
