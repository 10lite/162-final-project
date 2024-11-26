import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
// import { useTheme } from "next-themes"

export default function Header() {
  // const { setTheme, theme } = useTheme()

  return (
    <header className="border-b">
      <div className="container px-6 py-4 flex justify-left items-center">
        <h1 className="text-2xl font-bold">BantayTrapiko</h1>
        <nav>
          {/* <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </Button> */}
        </nav>
      </div>
    </header>
  )
}

