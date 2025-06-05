import Link from "next/link";
import React from "react";

const Navigator = () => {
  return (
    <div className="bg-on-surface lg:w-[30rem] w-full border border-muted lg:rounded-xl overflow-hidden flex justify-center items-center">
      <button className="w-full h-[4.5rem] my-4 mx-5 bg-secondary lg:rounded-xl rounded-md hover:bg-primary hover:text-secondary duration-200 text-strong text-2xl font-semibold tracking-wide">
        <Link href={"/designer"}>Designer</Link>
      </button>
    </div>
  );
};

export default Navigator;
