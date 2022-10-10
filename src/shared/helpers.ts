export const getLocalToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("ascii")
    );
  } catch (e) {
    return null;
  }
};
