import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../../../public/img/argentBankLogo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, selectToken } from "../../store/features/auth/authSlice";
import { selectUserProfile } from "../../store/features/user/userSlice";
import { NavItem } from "../../types/types";
import RouteGuard from "../RouteGuard";

export default function Nav(): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUserProfile);

  const [navigation, setNavigation] = useState<NavItem[]>([]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      setNavigation([
        {
          name: "Sign In",
          path: "/sign-in",
          icon: <i className="fa fa-user-circle"></i>,
        },
      ]);
    } else {
      setNavigation([
        {
          name: user.firstName,
          path: "/user",
          icon: <i className="fa fa-user-circle"></i>,
        },
        {
          name: "Sign Out",
          icon: <i className="fa fa-sign-out"></i>,
          onClick: handleLogout,
        },
      ]);
    }
  }, [token, user.firstName, handleLogout]);

  const handlePushRouter = (path: string) => {
    router.push(path);
  };

  return (
    <ul className="main-nav">
      <li className="main-nav-logo" onClick={() => handlePushRouter("/")}>
        <Image
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </li>
      {navigation.length > 1 ? (
        <RouteGuard>
          <div className="main-nav-container">
            {navigation.map((navItem: NavItem, index: number) => (
              <li
                key={index}
                className="main-nav-item"
                onClick={() =>
                  navItem?.path
                    ? handlePushRouter(navItem.path)
                    : navItem.onClick && navItem?.onClick()
                }
              >
                {navItem.icon}
                <span>{navItem.name}</span>
              </li>
            ))}
          </div>
        </RouteGuard>
      ) : (
        navigation.map((navItem: NavItem, index: number) => (
          <li
            key={index}
            className="main-nav-item"
            onClick={() =>
              navItem?.path
                ? handlePushRouter(navItem.path)
                : navItem.onClick && navItem?.onClick()
            }
          >
            {navItem.icon}
            <span>{navItem.name}</span>
          </li>
        ))
      )}
    </ul>
  );
}
