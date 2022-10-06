import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import logo from "../../../public/img/argentBankLogo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, selectToken } from "../../store/features/auth/authSlice";
import { selectUserProfile } from "../../store/features/user/userSlice";
import Link from "../Link";
import RouteGuard from "../RouteGuard";

export default function Nav(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUserProfile);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!token) handleLogout();
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
      {!token ? (
        <Link href="/log-in" className="main-nav-item">
          <>
            <i className="fa fa-user-circle"></i>
            Sign In
          </>
        </Link>
      ) : (
        <RouteGuard>
          <div>
            <Link href="/user" className="main-nav-item">
              <>
                <i className="fa fa-user-circle"></i>
                {user.firstName}
              </>
            </Link>
            <Link
              href="/log-in"
              className="main-nav-item"
              onClick={handleLogout}
            >
              <>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </>
            </Link>
          </div>
        </RouteGuard>
      )}
    </nav>
  );
}
