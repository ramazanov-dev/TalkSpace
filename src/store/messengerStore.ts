import { makeAutoObservable } from "mobx";
import { ChatModel } from "../models/chatModel.ts";
import { MessageModel } from "../models/messageModel.ts";

class MessengerStore {
  constructor() {
    makeAutoObservable(this);
  }

  chats: Array<ChatModel> = [];
  currentChatID: number | null = null;

  addNewChat = (id: number, username: string, firstName: string, avatarURL: string) => {
    this.chats.unshift({
      id,
      avatarURL,
      username,
      firstName,
      messages: []
    });
  };

  deleteChat = (id: number) => {
    this.chats = this.chats.filter(chat => chat.id !== id);
  };

  setCurrentChatID = (id: number) => {
    this.currentChatID = id;
  };

  insertMessage = (userID: number, message: MessageModel) => {
    const user = this.chats.find(user => user.id === userID);
    if (!user) return;

    const index = this.chats.indexOf(user);

    if (index > -1) {
      this.chats.splice(index, 1); // Удаляем элемент из текущей позиции
      this.chats.unshift(user); // Добавляем элемент в начало массива
    }


    user.messages.push(message);
  };
}

export default new MessengerStore();
