"use client";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  "confirm-password": Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  recaptcha: Yup.string().required("ReCAPTCHA is required"),
});

const Register = () => {
  const recaptchaRef = useRef(null);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome!</h2>
          <p className="mt-2 text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            "confirm-password": "",
            recaptcha: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form data", values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6" noValidate>
              <div>
                <Label htmlFor="name" className="flex justify-between">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-600"
                />
              </div>
              <div>
                <Label htmlFor="email" className="flex justify-between">
                  Email
                </Label>
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
                <Label htmlFor="password" className="flex justify-between">
                  Password
                </Label>
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
                <Label
                  htmlFor="confirm-password"
                  className="flex justify-between"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  className="mt-1"
                  placeholder="Enter your password again"
                />
                <ErrorMessage
                  name="confirm-password"
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
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
