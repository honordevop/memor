"use client";
import React from "react";
import styles from "./loginform.module.css";
import Button from "@/UI/Button";
import useInput from "@/utils/use-input";
import useError from "@/utils/useError";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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

  let formIsValid = emailIsValid && passwordIsValid;

  // if (session.status === "loading") {
  if (loading) {
    return (
      <div>
        Loading ...
        {/* <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> */}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const email = e.target[0].value;
    // const password = e.target[1].value;

    if (!formIsValid) {
      return;
    }

    signIn("credentials", { email, password });
    setTimeout(() => {
      // router?.push("/dashboard");
      setLoading(false);
    }, 5000);
  };

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

  return (
    <>
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
            <p>Forgot password?</p>
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
          <Button type="submit">Login </Button>
          {/* {loading && (
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )} */}
        </div>
        <p className={`${styles["error-text"]} ${styles["login-error"]}`}>
          {loginErrorMessage}
        </p>
        <p className={styles.signUp}>
          Don't have an account? <Link href="/dashboard/register">Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
