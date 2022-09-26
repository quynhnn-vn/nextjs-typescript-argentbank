import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouteGuard from "../src/components/RouteGuard";
import UserProfile from "../src/components/UserProfile";
import { useAppDispatch, useAppSelector } from "../src/hooks/hooks";
import { postUserProfile } from "../src/shared/apis";
import { logout, selectToken } from "../src/store/features/auth/authSlice";
import { setUserProfile } from "../src/store/features/user/userSlice";

const User: NextPage = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    postUserProfile(token)
      .then((response) => {
        if (response.status == 200) {
          dispatch(setUserProfile(response.body));
        }
        // redirect to log in if user not exist
        else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error));
  }, [token, dispatch]);

  return (
    <RouteGuard>
      <UserProfile />
    </RouteGuard>
  );
};
export default User;
