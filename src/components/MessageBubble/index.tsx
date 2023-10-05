import { FC } from "react";
import styles from "./index.module.scss"
import classNames from "classnames"
import { MessageModel } from "../../models/messageModel";
import { parseDateTime } from "../../controllers/parseDateTime";

interface MessageBubbleProps {
  message: MessageModel
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {

  const time = parseDateTime(message.date)

  return (
    <div className={classNames(styles.bubble, { [styles.isMine]: message.isMine })}>
      <span>{message.text}</span>
      <span className={styles.time} >{time.hours}:{time.minutes}</span>
    </div>
  );
};
