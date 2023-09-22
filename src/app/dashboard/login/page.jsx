"use client";
import React from "react";
import styles from "./page.module.css";
import Button from "@/UI/Button";
import useInput from "@/utils/use-input";
import useError from "@/utils/useError";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { signIn, useSession } from "next-auth/react";
import { BallTriangle } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { RotatingSquare } from "react-loader-spinner";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [err, setErr] = useState(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    errorMessage: loginErrorMessage,
    setErrorMessage: setLoginErrorMessage,
  } = useError();

  const session = useSession();
  const router = useRouter();

  let formIsValid = emailIsValid && passwordIsValid;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!formIsValid) {
      setLoginErrorMessage("Enter a valid email or password");
      setLoading(false);
      setTimeout(() => {
        setLoginErrorMessage("");
      }, 3000);
      return;
    }
    try {
      const res = signIn("credentials", { email, password });
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        setLoginErrorMessage("Wrong Login Credentials");
        setErr(true);
        // Return false to display a default error message
        return false;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    // setTimeout(
    //   // router?.push("/dashboard"),
    //   // router?.push("/dashboard");
    //   setLoading(false),
    //   10000
    // );
  };

  if (session.status === "loading") {
    return (
      <div className="absolute h-[100vh] w-[100vw] flex items-center justify-center z-20">
        <RotatingSquare
          height="100"
          width="100"
          color="#8B005D"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  // console.log(loading);
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  /*const formSubmitHandler = (event) => {
    event.preventDefault();

    
    setLoading(true)
    const userInput = {
      "email": email,
      "password": password,
    };    

    login(userInput)
    
    setTimeout(() => {
      emailInputReset()
      passwordInputReset()
      setLoading(false)
    }, 3000);

    if (status_code === 401) {
      console.log("failed login")
    }
    if (status_code === 200) {
      console.log("Successful login")
    }
    // navigate("/dashboard")    console.log(status_code)
  };*/

  const emailInputClasses = emailHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];
  const passwordInputClasses = passwordHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];

  if (session.status === "unauthenticated") {
    return (
      <div className="flex flex-col h-[100vh] items-center justify-center">
        {/* {!loading && ( */}
        <form onSubmit={handleSubmit}>
          <div className={emailInputClasses}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              placeholder="johndoe@gmail.com"
            />
            {emailHasError && (
              <p className={styles["error-text"]}>Enter a valid Email</p>
            )}
          </div>
          <div className={passwordInputClasses}>
            <label>Password </label>
            <input
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={styles["error-text"]}>Enter a valid Password</p>
            )}
            <a href="/" className={styles.passwordReset}>
              {/* <p>Forgot password?</p> */}
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <div>
              <p
                className={`${styles["error-text"]} ${styles["login-error"]} pb-2`}
              >
                {err && <p> {errMessage} </p>}
                {loginErrorMessage}
              </p>
              <div className="flex gap-2">
                <Button type="submit">Login </Button>
                <span className="pl-[10px]">
                  {loading && (
                    <BallTriangle
                      height={40}
                      width={40}
                      radius={4}
                      color="#4fa94d"
                      ariaLabel="ball-triangle-loading"
                      wrapperClass={{}}
                      wrapperStyle=""
                      visible={true}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </form>
        {/* )} */}
        <p className={styles.signUp}>
          Don't have an account? <Link href="/dashboard/register">Sign Up</Link>
        </p>
      </div>
    );
  }
};

export default LoginForm;
