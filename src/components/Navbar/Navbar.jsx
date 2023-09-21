"use client";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Button from "@/UI/Button";

const Navbar = () => {
  const session = useSession();

  return (
    <div
      className={`${styles.home} flex items-center justify-between px-[10px] md:px-[50px] h-20 bg-white w-full`}
    >
      <Link href="/">
        <p className="text-[30px] font-black text-red-600">
          <span>📸</span> Memor
        </p>
      </Link>

      {session.status === "authenticated" ? (
        <Button
          className="bg-red-600 py-[2px] px-[16px] flex items-center justify-center rounded-[10px] cursor-pointer text-[30px] font-bold text-white"
          onClick={signOut}
        >
          LogOut
        </Button>
      ) : (
        <Button className="bg-red-600 py-[2px] px-[16px] flex items-center justify-center rounded-[10px] cursor-pointer text-[30px] font-bold text-white">
          <Link href="/dashboard/login"> Login</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
