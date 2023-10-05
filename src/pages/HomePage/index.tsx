import {FC, useEffect} from "react";
import styles from "./index.module.scss";
import {observer} from "mobx-react-lite";
import MessengerStore from "../../store/messengerStore.ts";
import {Chat} from "../../components/Chat";
import {getMessageFromBot} from "../../controllers/getMessageFromBot.ts";

export const HomePage: FC = observer(() => {

  const {chats, currentChatID} = MessengerStore;
  const currentChat = chats.find(chat => chat.id === currentChatID);

  useEffect(() => {
    getMessageFromBot();
  }, []);

  return (
    <div className={styles.wrapper}>
      {currentChat ? <Chat currentChat={currentChat}/> : <div className={styles.noChats}>{chats.length ? "Select a chat to start messaging" : "Don't you have any chats :("}</div>}
    </div>
  );
});
