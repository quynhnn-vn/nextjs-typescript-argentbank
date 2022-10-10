import { Alert } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { postLogIn } from "../shared/apis";
import { login } from "../store/features/auth/authSlice";

interface FormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface Notification {
  message: string;
  isSuccess: undefined | boolean;
}

const SIGN_IN_FIELDS = [
  {
    type: "text",
    id: "username",
    name: "username",
    placeholder: "Username",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Password",
  },
];

export default function LogInForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues: FormValues = {
    username: "",
    password: "",
    rememberMe: false,
  };
  const [notification, setNotification] = useState<Notification>({
    message: "",
    isSuccess: undefined,
  });

  const validateValue = (value: string, name: string): string => {
    let error = "";
    if (!value) {
      error = `${name} is required`;
    } else if (value.length < 4) {
      error = `${name} too short`;
    }
    return error;
  };

  const handleLogIn = (values: FormValues) => {
    postLogIn(values)
      .then((response) => {
        setNotification({
          message: response?.message,
          isSuccess: response?.status === 200,
        });
        if (response?.status === 200) {
          dispatch(
            login({
              token: response?.body.token,
              rememberMe: values?.rememberMe,
            })
          );
          router.push("/user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          handleLogIn(values);
        }}
      >
        {(formik) => {
          const { errors, touched, dirty, isValid } = formik;
          return (
            <Form>
              {SIGN_IN_FIELDS.map((field) => (
                <div key={field.id} className="input-wrapper">
                  <label htmlFor={field.id}>{field.name}</label>
                  <Field
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    validate={(value: string) =>
                      validateValue(value, field.placeholder)
                    }
                    autoComplete="new-country-area"
                  />
                  {errors[field.name as keyof FormValues] &&
                    touched[field.name as keyof FormValues] && (
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="invalid-feedback"
                      />
                    )}
                </div>
              ))}
              <div className="input-remember">
                <Field type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button
                type="submit"
                className={[
                  "sign-in-button",
                  !(dirty && isValid) ? "disabled-button" : "",
                ].join(" ")}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
              {notification.isSuccess !== undefined && (
                <Alert severity={notification.isSuccess ? "success" : "error"}>
                  {notification.message}
                </Alert>
              )}
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
