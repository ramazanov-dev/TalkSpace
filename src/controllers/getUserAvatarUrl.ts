import axios from "axios";
import {API_URL, BOT_TOKEN} from "../config.ts";

const getUserProfilePhotos = async(userID: number) => {
  try {
    const response = await axios.get(`${API_URL}${BOT_TOKEN}/getUserProfilePhotos`, {
      params: {
        user_id: userID,
        limit: 1
      }
    });

    if(!response.data.ok || !response.data.result.photos.length) {
      return "";
    }

    return response.data.result.photos[0][0].file_id;
  } catch(error) {
    console.error(error);
    throw new Error("Failed to get user profile photos.");
  }
};

export const getUserAvatarUrl = async(userID: number) => {
  try {
    const avatarID = await getUserProfilePhotos(userID);

    const response = await axios.get(`${API_URL}${BOT_TOKEN}/getFile`, {
      params: {
        file_id: avatarID
      }
    });

    const avatarPath = response.data.result.file_path;

    return `https://api.telegram.org/file/bot${BOT_TOKEN}/${avatarPath}`;

  } catch(error) {
    console.error(error);
    throw new Error("Failed to get user avatar URL.");
  }
};
