import Actionbar from "@/components/actionbar";
import React, { ReactNode } from "react";

const HomeLayout = ({
  children,
  showActionBar,
}: {
  children: ReactNode;
  showActionBar: boolean;
}) => {
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
