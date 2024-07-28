"use client";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const recaptchaRef = useRef(null);
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
        <Formik
          initialValues={{
            email: "",
            password: "",
            recaptcha: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!values.recaptcha) {
              alert("Please complete the reCAPTCHA");
              setSubmitting(false);
              return;
            }

            console.log("Form data", values);
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
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lfd9xkqAAAAACTLpOgZd-iIuwV6dTxPZdrctvEI"
                  onChange={(value) => setFieldValue("recaptcha", value)}
                />
                <ErrorMessage name="recaptcha" component="div" />
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
