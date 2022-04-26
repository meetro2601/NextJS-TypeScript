import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Header></Header>
      <main className="">{children}</main>
    </>
  );
};

export default Layout;
