import axios from "axios";

export type TLoginData = {
  login?: string;
  password?: string;
  loginToken?: string;
};

export type TLoginResponse = {
  id: string;
  login: string;
  loginToken: string;
};

export const performLogIn = async (
  data: TLoginData
): Promise<TLoginResponse> => {
  const endpoint = "http://localhost:4200/v1/log";

  if (data.loginToken)
    return (
      await axios.post(`${endpoint}/recover`, {
        loginToken: data.loginToken,
      })
    ).data?.data;
  else
    return (
      await axios.post(`${endpoint}/in`, {
        nickname: data.login,
        password: data.password,
      })
    ).data?.data;
};
