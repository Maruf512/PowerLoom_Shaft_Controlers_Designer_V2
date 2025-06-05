import Footer from "@/components/layout/Footer";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full">
      <div className="mx-auto min-h-[calc(100vh-3rem)] py-6 w-full max-w-[95%] xl:max-w-[1300px] 2xl:max-w-[1500px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
