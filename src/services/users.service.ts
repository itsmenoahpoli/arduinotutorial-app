import { ElMessageBox, ElMessage } from "element-plus";
import { h } from "vue";
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
      .post(ROUTES.API.USERS.LIST, { ...payload, user_type: "client" })
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_CREATED) {
          ElMessage({
            type: "success",
            message: "User created successfully",
          });
        }
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          const errorData = error.response.data;

          // Create list items for each error
          const listItems = Object.entries(errorData.errors).map(
            ([field, messages]) => {
              const formattedField = field
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return h("li", { style: "margin-bottom: 8px;" }, [
                h(
                  "span",
                  { style: "font-weight: bold;" },
                  formattedField + ": "
                ),
                (messages as string[]).join(", "),
              ]);
            }
          );

          // Create the message box content
          const messageBoxContent = h("div", [
            h(
              "p",
              { style: "margin-bottom: 16px;" },
              "Please fix the following errors:"
            ),
            h(
              "ul",
              { style: "list-style-type: none; padding-left: 0;" },
              listItems
            ),
          ]);

          ElMessageBox.alert(messageBoxContent, "Validation Error", {
            confirmButtonText: "OK",
            type: "error",
            dangerouslyUseHTMLString: true,
          });
        } else {
          console.log(error);
        }
        return [];
      });
  };

  const updateUser = async (id: number, payload: any) => {
    return await httpClient
      .put(ROUTES.API.USERS.BY_ID(id), payload)
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_OK) {
          ElMessage({
            type: "success",
            message: "User updated successfully",
          });
        }
        return response.data;
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          const errorData = error.response.data;

          // Create list items for each error
          const listItems = Object.entries(errorData.errors).map(
            ([field, messages]) => {
              const formattedField = field
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return h("li", { style: "margin-bottom: 8px;" }, [
                h(
                  "span",
                  { style: "font-weight: bold;" },
                  formattedField + ": "
                ),
                (messages as string[]).join(", "),
              ]);
            }
          );

          // Create the message box content
          const messageBoxContent = h("div", [
            h(
              "p",
              { style: "margin-bottom: 16px;" },
              "Please fix the following errors:"
            ),
            h(
              "ul",
              { style: "list-style-type: none; padding-left: 0;" },
              listItems
            ),
          ]);

          ElMessageBox.alert(messageBoxContent, "Validation Error", {
            confirmButtonText: "OK",
            type: "error",
            dangerouslyUseHTMLString: true,
          });
        } else {
          console.log(error);
        }
        return null;
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
    updateUser,
    deleteUser,
  };
};
