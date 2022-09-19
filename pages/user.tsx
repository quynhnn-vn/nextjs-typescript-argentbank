import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouteGuard from "../src/components/RouteGuard";
import UserProfile from "../src/components/UserProfile";
import { postUserProfile } from "../src/shared/apis";
import { selectToken } from "../src/store/features/auth/authSlice";
import { UserProfileType } from "../src/types/types";

const User: NextPage = () => {
  const [activeUser, setActiveUser] = useState<UserProfileType>({
    email: "",
    firstName: "",
    lastName: "",
    createdAt: "",
    updatedAt: "",
    id: "",
  });

  const token = useSelector(selectToken);
  const router = useRouter();

  useEffect(() => {
    let sentToken = token;
    postUserProfile(sentToken)
      .then((response) => {
        if (response.status === 200) {
          setActiveUser(response.body);
        } else {
          router.push("/log-in");
        }
      })
      .catch((error) => console.log(error));
  }, [token, router]);

  return (
    <RouteGuard>
      <UserProfile user={activeUser} />
    </RouteGuard>
  );
};
export default User;
