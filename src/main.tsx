import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext.tsx";
import { MusicProvider } from "./context/MusicContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <MusicProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </MusicProvider>
    </StrictMode>
  </BrowserRouter>,
);
