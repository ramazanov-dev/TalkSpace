import axios from "axios";
import { API_URL, BOT_TOKEN } from "../config.ts";
import MessengerStore from "../store/messengerStore.ts";
import { getUserAvatarUrl } from "./getUserAvatarUrl.ts";

let updateID = 0;

export const getMessageFromBot = async () => {

  const { chats, addNewChat, insertMessage } = MessengerStore;
  let response;

  try {
    response = await axios.get(`${API_URL}${BOT_TOKEN}/getUpdates`, {
      params: {
        offset: updateID || ""
      }
    });

    const dataLength = response.data.result.length;

    if (dataLength) {

      const message = response.data.result[dataLength - 1].message;
      const user = response.data.result[dataLength - 1].message.chat;
      const candidate = chats.find(candidate => candidate.id === user.id);
      const avatarURL = await getUserAvatarUrl(user.id);

      console.log(message);

      const newMessage = {
        id: message.message_id,
        text: message.text,
        isMine: false,
        date: message.date
      };

      if (!candidate) {
        addNewChat(user.id, user.username, user.first_name, avatarURL);
      }

      insertMessage(user.id, newMessage);

      updateID = response.data.result[dataLength - 1].update_id + 1;
    }

  } catch (e) {
    console.error(e);
  }

  getMessageFromBot();
};
