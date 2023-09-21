import React from "react";
import background from "public/background.jpg";
import Image from "next/image";
import styles from "./hero.module.css";
import Link from "next/link";
import Button from "@/UI/Button";

const Hero = () => {
  return (
    <div className={`${styles.heroWrapper} relative`}>
      <Image
        src={background}
        fill
        priority
        objectFit="cover"
        alt="memor background"
      />
      <div className="flex flex-col justify-center items-center absolute z-10 h-[100vh] w-full">
        <div className={`${styles.titleWrapper}  tracking-[5px] gap-5`}>
          <p
            className={`${styles.heroTitle} font-black text-[30px] md:text-[56px]`}
          >
            Let's Create Memories <br /> in pictures -
            <span className="">Together</span>
          </p>
          <p
            className={`${styles.subText} rounded-tl-[10px] rounded-br-[10px] p-[2px] w-max text-[30px] font-bold px-[10px]`}
          >
            Sounds Cool🥰?
          </p>
          <Link href="/dashboard/register">
            <Button className=" bg-red-600 py-[6px] px-[16px] flex items-center justify-center rounded-[10px] cursor-pointer text-[30px] font-bold text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
