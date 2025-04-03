import { ElMessageBox, ElMessage } from "element-plus";
import { httpClient } from "@/api";
import { ROUTES, HTTP } from "@/constants";

export const useUsersService = () => {
  const fetchUsers = async () => {
    return await httpClient
      .get(ROUTES.API.USERS.LIST)
      .then((response) => response.data)
      .catch(() => {
        return [];
      });
  };

  const createUser = async (payload: any) => {
    return await httpClient
      .post(ROUTES.API.USERS.LIST, payload)
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_CREATED) {
          ElMessage({
            type: "success",
            message: "User created successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  const deleteUser = async (id: number) => {
    return await httpClient
      .delete(ROUTES.API.USERS.BY_ID(id))
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_NO_CONTENT) {
          ElMessage({
            type: "warning",
            message: "User deleted successfully",
          });
        }
      });
  };

  return {
    fetchUsers,
    createUser,
    deleteUser,
  };
};