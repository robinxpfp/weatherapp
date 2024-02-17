import React from "react";
import Link from "next/link";

export default function Footer() {
  const links =
    "hover:text-gray-800 dark:hover:text-gray-300 decoration-dashed underline cursor-pointer transition duration-500 ease-in-out underline-offset-4";
  return (
    <div className="flex justify-center p-4 md:dark:bg-black dark:bg-black md:bg-gray-100 bg-gray-200 dark:text-white text-black ">
      <div className="space-y-2">
        <p className="   mx-10 text-center  text-md">
          Built with{" "}
          <Link className={links} href="https://nextjs.org/">
            Next.js
          </Link>
          ,{" "}
          <Link className={links} href="https://tailwindcss.com/">
            TailwindCSS
          </Link>{" "}
          and{" "}
          <Link className={links} href="https://vercel.com/">
            Vercel
          </Link>{" "}
          by{" "}
          <Link className={links} href="https://robin.do">
            robin.do
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
