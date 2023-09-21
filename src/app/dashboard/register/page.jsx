import React from "react";
import styles from "./page.module.css";
import registerSvg from "public/register.svg";
import Image from "next/image";
import RegistrationForm from "@/components/Register/RegisterForm";

const Register = () => {
  return (
    <div className={`${styles.container} flex bg-red-300`}>
      <div className="hidden md:block flex-1 relative">
        <Image src={registerSvg} fill objectFit="contain" alt="register svg" />
      </div>
      <div className="flex-1 ">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
