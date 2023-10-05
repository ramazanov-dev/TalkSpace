import { MessageModel } from "./messageModel.ts";

export interface ChatModel {
  id: number,
  avatarURL: string,
  username: string,
  firstName: string,
  messages: Array<MessageModel>
}
