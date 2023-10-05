import { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { MessageBubble } from "../MessageBubble";
import { sendMessageToBot } from "../../controllers/sendMessageToBot.ts";
import { observer } from "mobx-react-lite";
import Icon from "../../components/Icon";
import { ChatModel } from "../../models/chatModel.ts";
import classNames from "classnames";

interface ChatProps {
  currentChat: ChatModel;
}

export const Chat: FC<ChatProps> = observer(({ currentChat }) => {

  const [inputValue, setInputValue] = useState("");
  const messagesRef = useRef<HTMLHeadingElement>(null);
  const messagesLength = currentChat.messages.length;

  const clickHandler = () => {
    submitMessageHandler();
  };

  const keyDownHandler = (event: any) => {
    if (event.key !== "Enter") return;

    submitMessageHandler();
  };

  const submitMessageHandler = () => {
    const formattedValue = inputValue.trim();
    if (!formattedValue) return;

    sendMessageToBot(formattedValue);
    setInputValue("");
  };

  const changeHandler = (event: any) => {
    setInputValue(event.currentTarget.value);
  };


  useEffect(() => {

    if (messagesRef.current) {

      messagesRef.current.scrollTo({
        top: messagesRef.current.clientHeight, behavior: "smooth",
      });

    }
  }, [messagesLength]);

  return (

    <div className={styles.container}>
      <header className={styles.chatHeader}>
        <div
          className={classNames(styles.avatar, { [styles.noAvatar]: !currentChat.avatarURL })}
          style={{ backgroundImage: `url(${currentChat.avatarURL})` }}
        >
          {!currentChat.avatarURL ? currentChat.firstName.slice(0, 1) : null}
        </div>

        <div className={styles.userInfo}>
          <strong className={styles.firstName}>{currentChat.firstName}</strong>
          <span className={styles.username}><a href={`https://t.me/${currentChat.username}}`}>{"@" + currentChat.username}</a></span>
        </div>
      </header>

      <div className={styles.messages} ref={messagesRef}>

        {currentChat ? currentChat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />)) : null}
      </div>

      <div className={styles.inputContainer}>
        <input
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          type="text"
          value={inputValue}
          className={styles.input}
          placeholder="Message"
        />
        <button onClick={clickHandler} className={styles.sendMessage}><Icon icon="custom-telegram-1" /></button>
      </div>
    </div>

  );
});
