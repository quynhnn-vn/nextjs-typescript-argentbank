interface LogInPayload {
  username: string;
  password: string;
}

interface UserPayload {
  firstName: string;
  lastName: string;
}

const endpoint = "http://localhost:3001/api/v1";

export const postLogIn = async (logInPayload: LogInPayload) => {
  const response = await fetch(`${endpoint}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: logInPayload.username,
      password: logInPayload.password,
    }),
  });
  return await response.json();
};

export const postUserProfile = async (userToken: string) => {
  const response = await fetch(`${endpoint}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return await response.json();
};

export const putUserProfile = async (
  userToken: string,
  userPayload: UserPayload
) => {
  const response = await fetch(`${endpoint}/user/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPayload),
  });
  return await response.json();
};
