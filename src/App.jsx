import { CopilotKit } from "@copilotkit/react-core";
import { MainComponent } from "./components/MainComponent";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

function App() {
  return (
    <>
      <Navbar />
      <MainComponent />
      <Toaster />
      <CopilotPopup
        instructions={`
       Be a nice assistant, just add a quote when the user asks to and add it to the list, and delete the quote based on index of the list when the user asks to, don't do anything extra, dont' ask for anything extra.
        Fallback:
        - If unable to generate a quote, apologize and suggest a random quote from a well-known author.`}
        labels={{
          title: "Jarvis Assistant",
          initial: "Welcome! I'm here to help. What do you need?"
        }}
      />
    </>
  );
}

export default App;
