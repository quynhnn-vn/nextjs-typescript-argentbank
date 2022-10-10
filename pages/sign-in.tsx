import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogInForm from "../src/components/LogInForm";
import { selectToken } from "../src/store/features/auth/authSlice";

const LogIn: NextPage = () => {
  const router = useRouter();

  const token = useSelector(selectToken);

  useEffect(() => {
    // redirect to user if already logged in
    if (token) {
      router.push("/user");
    }
  }, [token, router]);

  return (
    <main className="main bg-dark">
      <LogInForm />
    </main>
  );
};

export default LogIn;
