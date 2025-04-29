import { ElMessageBox, ElMessage } from "element-plus";
import { httpClient } from "@/api";
import { ROUTES, HTTP } from "@/constants";

export const useVideosService = () => {
  const fetchVideos = async () => {
    return await httpClient
      .get(ROUTES.API.VIDEOS.LIST)
      .then((response) => response.data)
      .catch(() => {
        return [];
      });
  };

  const uploadVideo = async (payload: any) => {
    const formData = new FormData();

    // Add basic fields
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("status", payload.status);

    // Add files if they exist
    if (payload.video_file) {
      formData.append("video_file", payload.video_file);
    }
    if (payload.thumbnail_file) {
      formData.append("thumbnail_file", payload.thumbnail_file);
    }

    // Add questions as JSON string
    formData.append("questions", JSON.stringify(payload.questions));

    return await httpClient
      .post(ROUTES.API.VIDEOS.LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_CREATED) {
          ElMessageBox.alert("Video uploaded", "Info", {
            confirmButtonText: "Okay!",
            confirmButtonClass: "!bg-green-700",
            type: "success",
            callback: () => {
              window.location.href = ROUTES.PAGES.ADMIN.DASHBOARD;
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  const deleteVideo = async (id: number) => {
    return await httpClient
      .delete(ROUTES.API.VIDEOS.BY_ID(id))
      .then((response) => {
        if (response.status === HTTP.RESPONSES.HTTP_NO_CONTENT) {
          ElMessage({
            type: "warning",
            message: "Video deleted successfully",
          });
        }
      });
  };

  return {
    fetchVideos,
    uploadVideo,
    deleteVideo,
  };
};
