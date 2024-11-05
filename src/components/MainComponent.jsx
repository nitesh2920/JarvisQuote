/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ui/theme-provider";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

const DEFAULT_QUOTES = [
  {
    id: 1,
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    id: 2,
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    id: 3,
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  }
];

export function MainComponent() {
  const [userQuote, setUserQuote] = useState("");
  const [userName, setUserName] = useState("");
  const [sharedQuotes, setSharedQuotes] = useState(DEFAULT_QUOTES);
  const { toast } = useToast();


  useCopilotReadable({
    description: "The list of SharedQuotes",
    value: JSON.stringify(sharedQuotes)
  });

  useCopilotAction({
    name: "addQuote",
    description: "Add a new quote to the quotes list.",
    parameters: [
      {
        name: "quote",
        type: "string",
        description: "The quote to be added."
      },
      {
        name: "author",
        type: "string",
        description: "The author of the quote."
      }
    ],
    handler: ({ quote, author }) => {
      addQuote(quote, author);
      return `Quote added: "${quote}" by ${author || "John Doe"}.`;
    }
  });

  useCopilotAction({
    name: "deleteQuote",
    description: "Deletes a quote from the quotes list.",
    parameters: [
      {
        name: "index",
        type: "number",
        description: "The name or index of the quote to be deleted",
        required: true,
      }
    ],
    handler: ({ index }) => {
      deleteQuote(index);
      return `Quote at index ${index} deleted.`;
    }
  });

  const addQuote = (quote, author) => {

    const newQuote = {
     
      content: quote,
      author: author.trim() || "John Doe"
    };

    setSharedQuotes((prevQuotes) => [newQuote, ...prevQuotes]);
    toast({
      title: "Success",
      description: "Your quote has been added!"
    });
  };

  const deleteQuote = (index) => {
    setSharedQuotes((prevQuotes) => prevQuotes.filter((_, i) => i !== index));
    toast({
      title: "Success",
      description: "Your quote has been deleted!"
    });
  };

  const handleShareQuote = () => {
    if (!userQuote.trim()) {
      toast({
        title: "Error",
        description: "Please enter a quote before sharing.",
        variant: "destructive"
      });
      return;
    }

    addQuote(userQuote, userName);
    setUserQuote("");
    setUserName("");
  };
  const { theme } = useTheme();
  // const memoizedQuotes = useMemo(() => sharedQuotes, [sharedQuotes]);

  const shareQuote = (quote) => {
    const shareText = encodeURIComponent(
      `"${quote.content}" - ${quote.author}`
    );
    const twitterUrl = `https://x.com/intent/tweet?text=${shareText}`;
    window.open(twitterUrl, "_blank");
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Quotes</h2>
      <div className="grid gap-4 mb-8">
        {sharedQuotes.map((quote, index) => (
          <Card
            key={index}
            className={`relative group ${
              index === 0
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle className={index === 0 ? "text-white" : ""}>
                {index === 0 ? "Featured Quote" : `Quote ${index + 1}`}
              </CardTitle>
              <div className="absolute top-2 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <FaShareAlt
                  className="text-blue-600 cursor-pointer"
                  onClick={() => shareQuote(quote)}
                />
              </div>
              <div
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => deleteQuote(index)}
              >
                <FaTrash className="text-red-600 cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent>
              <p
                className={`text-xl font-serif italic ${
                  index === 0 ? "" : "text-gray-700"
                } ${theme === "dark" || theme==="system" ? "text-white" : ""}`}
              >
                "{quote.content}"
              </p>
              <p
                className={`mt-4 text-right font-medium ${
                  index === 0 ? "" : "text-gray-600"
                } ${theme === "dark" || theme==="system" ? "text-white" : ""}`}
              >
                - {quote.author}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Quote Card */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Quote</CardTitle>
          <CardDescription>Inspire others with your own words</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your motivational quote..."
            value={userQuote}
            onChange={(e) => setUserQuote(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Your name (optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mb-4"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleShareQuote}>Share Quote</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
