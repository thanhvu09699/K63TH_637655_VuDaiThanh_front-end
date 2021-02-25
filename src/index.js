import ReactDOM from "react-dom";

import { AppProvider } from "./context";
import App from "./App";

// Trang chính của app : nới render ra component App và bọc AppProvider để dùng các state của context.js

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
