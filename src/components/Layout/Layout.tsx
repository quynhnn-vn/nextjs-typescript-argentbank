import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <div>
      <Header />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
