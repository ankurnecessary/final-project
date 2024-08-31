"use client";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import { getCaptchaValidity } from "@/server-actions/recaptcha";
import ErrorAlert from "../custom-ui/errorAlert/error-alert";
import { useSearchParams } from 'next/navigation';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  recaptcha: Yup.string().required("ReCAPTCHA is required"),
});

const Login = () => {
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const isAuthError = useSearchParams().get('error') === 'authError';
  return (
    <>
      {captchaError && (
        <ErrorAlert
          heading="Error"
          description="Error with captcha. Please try again."
        />
      )}
      {isAuthError && (
        <ErrorAlert
          heading="Error"
          description="We couldn’t sign you in. Please try again."
        />
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
          recaptcha: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form data", values);
          const isCaptchaValid = await getCaptchaValidity(values.recaptcha);
          if (!isCaptchaValid) {
            setCaptchaError(true);
            recaptchaRef.current?.reset();
            return;
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4" noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="true"
                data-testid="email"
                required
                className="mt-1"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-600"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                data-testid="password"
                name="password"
                type="password"
                autoComplete="true"
                required
                className="mt-1"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-600"
              />
            </div>
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lfd9xkqAAAAACTLpOgZd-iIuwV6dTxPZdrctvEI"
                onChange={(value) => setFieldValue("recaptcha", value)}
                title="reCAPTCHA-i"
              />
              <ErrorMessage
                name="recaptcha"
                component="span"
                className="text-red-600"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
