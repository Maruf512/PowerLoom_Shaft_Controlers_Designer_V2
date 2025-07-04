import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full">
      <div className="mx-auto  py-6 w-full max-w-[95%] xl:max-w-[1300px] 2xl:max-w-[1500px] space-y-6 min-h-screen">
        <NavBar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
