import { FC, useState } from "react";
import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import Icon from "../Icon";
import { UserItem } from "../UserItem/index.tsx";
import MessengerStore from "../../store/messengerStore.ts";

export const Sidebar: FC = observer(() => {

  const { chats } = MessengerStore;
  const [inputValue, setInputValue] = useState("")

  const changeHandler = (event: any) => {
    setInputValue(event.currentTarget.value)
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <label htmlFor="searchUsers" className={styles.headerSearchContainer}>
          <input onChange={changeHandler} value={inputValue} id="searchUsers" className={styles.headerSearch} type="text" placeholder="Seach" />
          <Icon icon="custom-search-1" />
        </label>

      </header>

      <h2 className={styles.title}>Users</h2>

      <div className={styles.chatsContainer}>
        {chats.filter(chat => inputValue ? chat.firstName.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) : chat)
          .map(chat => (
            <UserItem firstName={chat.firstName} avatar={chat.avatarURL} key={chat.id} id={chat.id} />
          ))}
      </div>
    </div>
  );
});
