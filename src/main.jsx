import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
// import { CopilotChat } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";

createRoot(document.getElementById("root")).render(
  <CopilotKit   runtimeUrl={import.meta.env.VITE_GOOGLE_SERVER_KEY}>
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
   </CopilotKit> 
);