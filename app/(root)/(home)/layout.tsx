import Actionbar from "@/components/actionbar";
import React, { ReactNode } from "react";

// defining the props type for better clarity and reusability
type HomeLayoutProps = {
  children: ReactNode;
  showActionBar: boolean;
};

const HomeLayout = ({ children, showActionBar }: HomeLayoutProps) => {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex-1">
        <div className="w-full">{children}</div>
      </section>
      {showActionBar && <Actionbar />}
    </main>
  );
};

export default HomeLayout;
