export interface LogInPayload {
  username: string;
  password: string;
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

export const postUserProfile = async (userPayload: string) => {
  const response = await fetch(`${endpoint}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userPayload}`,
    },
  });
  return await response.json();
};
