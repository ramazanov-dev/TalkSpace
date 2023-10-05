import { FC } from "react";
import styles from "./index.module.scss";
import messengerStore from "../../store/messengerStore.ts";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import Icon from "../Icon/index.tsx";
import { useNavigate } from "react-router-dom";


interface UserItemProps {
  firstName: string;
  id: number;
  avatar: string;
}

export const UserItem: FC<UserItemProps> = observer(({ firstName, id, avatar }) => {

  const { setCurrentChatID, currentChatID, deleteChat } = messengerStore;
  const navigate = useNavigate()

  const clickHandler = () => {
    setCurrentChatID(id);
    navigate(`/chat/${id}`)
  };

  const deleteHandler = () => {
    deleteChat(id)
  }

  return (
    <div className={classNames(styles.user, { [styles.userSelected]: currentChatID === id })} onClick={clickHandler}>
      <div className={styles.userInfo}>
        <div
          className={classNames(styles.avatar, { [styles.noAvatar]: !avatar })}
          style={{ backgroundImage: `url(${avatar})` }}
        >
          {!avatar ? firstName.slice(0, 1) : null}
        </div>
        <span className={styles.firstName}>{firstName}</span>
      </div>

      <div className={styles.deleteChatBtn} onClick={deleteHandler}>
        <Icon icon="custom-trash-1" />
      </div>
    </div>
  );
});
