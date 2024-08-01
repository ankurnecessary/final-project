"use client";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import { getCaptchaValidity } from "@/server-actions/recaptcha";
import ErrorAlert from "../custom-ui/error-alert";

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
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </p>
        </div>
        {captchaError && (
          <ErrorAlert
            heading="Error"
            description="Error with captcha. Please try again."
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
            <Form className="space-y-6" noValidate>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                {/* TODO: How to implement Recaptcha in the backend */}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lfd9xkqAAAAACTLpOgZd-iIuwV6dTxPZdrctvEI"
                  onChange={(value) => setFieldValue("recaptcha", value)}
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
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign in with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
