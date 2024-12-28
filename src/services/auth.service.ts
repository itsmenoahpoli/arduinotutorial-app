import { httpClient } from "@/api";
import { ROUTES, HTTP } from "@/constants";
import { useAuthStore } from "@/stores";

export const useAuthService = () => {
  const { SET_TOKEN, SET_USER, CLEAR_DATA } = useAuthStore();

  const userSignin = async (userCredentials: any) => {
    return await httpClient
      .post(ROUTES.API.SIGNIN, userCredentials)
      .then((response) => {
        if (HTTP.RESPONSES.HTTP_OK) {
          const { token, user } = response.data;
          SET_TOKEN(token);
          SET_USER(user);

          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userSignout = () => {
    CLEAR_DATA();
  };

  return {
    userSignin,
    userSignout,
  };
};
