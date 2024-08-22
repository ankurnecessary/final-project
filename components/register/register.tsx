"use client";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import { getCaptchaValidity } from "@/server-actions/recaptcha";
import ErrorAlert from "../custom-ui/errorAlert/error-alert";
import InfoPopover from "../custom-ui/infoPopover/info-popover";
import PasswordInfo from "./passwordInfo";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required")
    .matches(/[A-Z]/, "Password must include at least 1 upper case letter.")
    .matches(/[a-z]/, "Password must include at least 1 lower case letter.")
    .matches(/[0-9]/, "Password must include at least 1 number.")
    .matches(
      /[!@#$%^&*()_+\-=[\]{}|;:',.<>?/`~]/,
      "Password must include at least 1 special character."
    ),
  "confirm-password": Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  recaptcha: Yup.string().required("ReCAPTCHA is required"),
});

const Register = () => {
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="md:max-w-xl w-full space-y-8 md:border md:rounded-lg md:shadow-lg p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome!</h2>
          <p className="mt-2 text-muted-foreground">
            Create your account to get started.
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
            name: "",
            email: "",
            password: "",
            "confirm-password": "",
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
            <Form noValidate>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="flex justify-between">
                    Name
                  </Label>
                  <Input
                    id="name"
                    data-testid="name"
                    name="name"
                    type="text"
                    autoComplete="true"
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
                    data-testid="email"
                    name="email"
                    type="email"
                    autoComplete="true"
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
                  <Label htmlFor="password" className="flex">
                    Password
                    <InfoPopover>
                        <PasswordInfo></PasswordInfo>
                    </InfoPopover>
                  </Label>
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
                  <Label
                    htmlFor="confirm-password"
                    className="flex justify-between"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    data-testid="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="true"
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
              </div>
              <div className="mt-8">
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
              <Button
                type="submit"
                className="w-full mt-8"
                disabled={isSubmitting}
              >
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
