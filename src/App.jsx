import { MainComponent } from "./components/MainComponent";
import { Navbar } from "./components/Navbar";
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
       Be a nice assistant, just add a quote when the user asks to and add it to the list, and delete the quote based on index of the list when the user asks to, don't do anything extra, dont' ask for anything extra nad also give the total number of quotes when asked.
        Fallback:
        - If unable to generate a quote, apologize and suggest a random quote from a well-known author.`}
        labels={{
          title: "QuoteGenie",
          initial: "Welcome ! I’m QuoteGenie, here to fuel your ambition with the perfect quote."
        }}
      />
    </>
  );
}

export default App;
