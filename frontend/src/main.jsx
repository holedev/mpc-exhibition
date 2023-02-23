import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import { default as UserProvider } from "./UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </UserProvider>
    </React.StrictMode>
);
