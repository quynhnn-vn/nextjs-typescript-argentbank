import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../../public/img/argentBankLogo.png";
import { logout, selectToken } from "../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Link from "./Link";
import RouteGuard from "./RouteGuard";

export default function Nav(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken || token) setIsAuth(true);
    else handleLogout();
  }, [token, handleLogout]);

  return (
    <nav className="main-nav">
      <Link href="/" className="main-nav-logo">
        <>
          <Image
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </>
      </Link>
      {!isAuth ? (
        <div>
          <Link href="/log-in" className="main-nav-item">
            <>
              <i className="fa fa-user-circle"></i>
              Sign In
            </>
          </Link>
        </div>
      ) : (
        <RouteGuard>
          <div>
            <Link href="/user" className="main-nav-item">
              <>
                <i className="fa fa-user-circle"></i>
                Tony
              </>
            </Link>
            <a onClick={handleLogout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        </RouteGuard>
      )}
    </nav>
  );
}
