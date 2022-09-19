import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/features/auth/authSlice";

interface RouteGuardProps {
  children: JSX.Element;
}

export default function RouteGuard(props: RouteGuardProps) {
  const { children } = props;
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const token = useSelector(selectToken);

  const authCheck = useCallback(
    (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      const publicPaths = ["/log-in"];
      const path = url.split("?")[0];
      if (!token && !publicPaths.includes(path)) {
        setIsAuth(false);
        router.push({
          pathname: "/log-in",
          query: { returnUrl: router.asPath },
        });
      } else {
        setIsAuth(true);
      }
    },
    [router, token]
  );

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setIsAuth(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router.asPath, router.events, authCheck]);

  return isAuth ? children : null;
}
