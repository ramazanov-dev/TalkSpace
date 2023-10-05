import axios from "axios";
import { API_URL, BOT_TOKEN } from "../config.ts";
import MessengerStore from "../store/messengerStore.ts";


export const sendMessageToBot = async (message: string) => {
  const { currentChatID, insertMessage } = MessengerStore;
  let response;

  if (!currentChatID) return alert("Chat is not selected");

  try {
    response = await axios.get(`${API_URL}${BOT_TOKEN}/sendMessage`, {
      params: {
        chat_id: currentChatID,
        text: message
      }
    });

    if (response.data.ok) {

      const chatID = response.data.result.chat.id;

      console.log();

      const newMessage = {
        id: response.data.result.message_id,
        text: response.data.result.text,
        isMine: true,
        date: response.data.result.date
      };

      insertMessage(chatID, newMessage);

    }
  } catch (e) {
    console.error(e);
  }

};
