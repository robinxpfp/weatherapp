import React from "react";
import Link from "next/link";

export default function Footer() {
  const links =
    "hover:text-gray-800 dark:hover:text-gray-300 hover:decoration-dashed hover:underline cursor-pointer transition duration-500 ease-in-out";
  return (
    <div className="flex justify-center p-4 md:dark:bg-black dark:bg-black md:bg-gray-100 bg-gray-200 dark:text-white text-black">
      <div className="space-y-2">
        <p className="   mx-10 text-center  text-md">
          Built with{" "}
          <Link className={links} href="https://nextjs.org/">
            Next.js
          </Link>
          ,{" "}
          <Link className={links} href="https://tailwindcss.com/">
            Tailwind
          </Link>{" "}
          and{" "}
          <Link className={links} href="https://vercel.com/">
            Vercel
          </Link>{" "}
          by{" "}
          <Link className={links} href="https://robin.do">
            Robin
          </Link>{" "}
          ({" "}
          <Link className={links} href="https://twitter.com/robinglto_">
            @robinglto_ on twitter
          </Link>{" "}
          ,{" "}
          <Link className={links} href="https://github.com/robinglto">
            @robinglto on github
          </Link>{" "}
          )
        </p>
      </div>
    </div>
  );
}
