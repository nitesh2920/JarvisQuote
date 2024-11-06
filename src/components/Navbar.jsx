import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { FaGithub } from "react-icons/fa";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">QuoteGenie</h1>
        <div className="flex gap-4 items-center">

            <ModeToggle/>
            <a
            href="https://github.com/nitesh2920"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white hover:text-slate-500 transition duration-300"
          >
            <FaGithub size={26} />
          </a>
          <Button variant="ghost">About</Button>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
}