import { httpClient } from "@/api";
import { ROUTES, HTTP } from "@/constants";

export const useVideosService = () => {
  const fetchVideos = async () => {
    return await httpClient
      .get(ROUTES.API.VIDEOS.LIST)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  return {
    fetchVideos,
  };
};
