import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Jarvis Quotes</h1>
        <div className="flex gap-4">

            <ModeToggle/>
          <Button variant="ghost">About</Button>
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
}