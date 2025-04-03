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

    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("video_file", payload.video_file);
    formData.append("thumbnail_file", payload.thumbnail_file);
    formData.append("question1", payload.question1);
    formData.append("answer1", payload.answer1);
    formData.append("question2", payload.question2);
    formData.append("answer2", payload.answer2);
    formData.append("question3", payload.question3);
    formData.append("answer3", payload.answer3);
    formData.append("question4", payload.question4);
    formData.append("answer4", payload.answer4);
    formData.append("question5", payload.question5);
    formData.append("answer5", payload.answer5);

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
