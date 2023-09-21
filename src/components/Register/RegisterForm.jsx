"use client";
import React, { useState } from "react";
import useInput from "@/utils/use-input";
import styles from "./registerform.module.css";
import useError from "@/utils/useError";
import Button from "@/UI/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";

const RegistrationForm = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.includes("@"));

  const router = useRouter();

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset,
  } = useInput((value, password) => value.trim() !== "" && value.length > 7);

  const {
    value: passwordCheck,
    isValid: passwordCheckIsValid,
    hasError: passwordCheckHasError,
    valueChangeHandler: passwordCheckChangeHandler,
    inputBlurHandler: passwordCheckBlurHandler,
    reset: passwordCheckInputReset,
  } = useInput((value) => value === password);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: usernameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    errorMessage: loginErrorMessage,
    setErrorMessage: setLoginErrorMessage,
  } = useError();

  let formIsValid =
    emailIsValid && passwordIsValid && usernameIsValid && passwordCheckIsValid;

  const register = async (text) => {
    setLoading(true);
    try {
      // console.log(text);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      // console.log(body);
      res.status === 201 && router.push("/dashboard/login");
      setLoading(false);
    } catch (error) {
      setErr(true);
      console.log(error);
      // setTimeout(() => {
      //   setLoginErrorMessage("");
      // }, 5000);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userInput = {
      email: email,
      password: password,
      username: username,
    };

    // console.log(`${firstName} ${lastName} ${password} ${passwordCheck}`)

    register(userInput);

    // console.log(userInput);

    setTimeout(() => {
      emailInputReset();
      passwordInputReset();
      passwordCheckInputReset();
      usernameInputReset();
    }, 10000);
  };

  const emailInputClasses = emailHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];
  const passwordInputClasses = passwordHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];
  const passwordCheckInputClasses = passwordCheckHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];
  const usernameInputClasses = usernameHasError
    ? `${styles["form-control"]} ${styles.invalid}`
    : styles["form-control"];

  return (
    <div
      className={`${styles.container} w-full flex items-center justify-center h-full`}
    >
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div className={usernameInputClasses}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            placeholder="Ogunlade"
          />
          {usernameHasError && (
            <p className={styles["error-text"]}>Enter a valid Username</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="stephenogunlade@gmail.com"
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
            <p className={styles["error-text"]}>
              Enter a valid Password of atleast 8 characters
            </p>
          )}
        </div>
        <div className={passwordCheckInputClasses}>
          <label>Password </label>
          <input
            type="password"
            value={passwordCheck}
            onChange={passwordCheckChangeHandler}
            onBlur={passwordCheckBlurHandler}
          />
          {passwordCheckHasError && (
            <p className={styles["error-text"]}>Password does not match</p>
          )}
        </div>
        <Button type="submit">Sign Up</Button>
        {loading && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        )}
        <p className={`${styles["error-text"]} ${styles["login-error"]}`}>
          {loginErrorMessage}
        </p>
        {err && (
          <p className="text-bold text-red-500"> "Something went wrong"</p>
        )}
      </form>
      {/* <p className={styles.signUp}>
        <Link href="/dashboard/login">Login with an existing account</Link>
      </p> */}
    </div>
  );
};

export default RegistrationForm;
