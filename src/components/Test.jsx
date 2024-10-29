import { useCopilotContext } from "@copilotkit/react-core";
import { useState } from "react";

export function TestComponent() {
  const [response, setResponse] = useState("");
  const copilot = useCopilotContext();

  const testCopilot = async () => {
    if (!copilot) {
      console.error("Copilot is undefined");
      return;
    }
    
    try {
      const result = await copilot.sendMessage("Say hello!");
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={testCopilot}>Test Copilot</button>
      {response && <p>{response}</p>}
    </div>
  );
}