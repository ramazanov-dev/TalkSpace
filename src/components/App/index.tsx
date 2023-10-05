import { FC, useEffect } from "react";
import { HomePage } from "../../pages/HomePage";
import { Sidebar } from "../Sidebar";
import styles from "./index.module.scss"
import { useLocation, useNavigate } from "react-router-dom";
import messengerStore from "../../store/messengerStore";

export const App: FC = () => {

  const { currentChatID, setCurrentChatID } = messengerStore
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    if (!currentChatID) {
      navigate('/')
    }

    if (location.pathname === "/") {
      setCurrentChatID(0)
    }

  }, [location.pathname])

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <HomePage />
    </div>
  );
};
