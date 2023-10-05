import ReactDOM from "react-dom/client";
import {App} from "./components/App";
import {BrowserRouter} from "react-router-dom";
import {IconsCollection} from "./components/Icon";
import "./styles/null.scss";
import "./styles/index.scss";
import "./styles/vars.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <IconsCollection/>
    <App />
  </BrowserRouter>
);
