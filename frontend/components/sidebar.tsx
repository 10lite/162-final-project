'use client'
import { Button } from "./ui/button"
import { CarIcon, VideoIcon, BarChartIcon, InfoIcon, AlertTriangle } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
export default function Sidebar() {
  const pathname = usePathname()

  const menu_items = [
    { icon: <InfoIcon className="mr-2 h-4 w-4" />, text: "About the App", path: "/about" },
    { icon: <VideoIcon className="mr-2 h-4 w-4" />, text: "Analyze Traffic", path: "/" },
    { icon: <BarChartIcon className="mr-2 h-4 w-4" />, text: "Davao Traffic", path: "/map" },
    { icon: <CarIcon className="mr-2 h-4 w-4" />, text: "Commute Guide", path: "https://davao-jeepney-guide.vercel.app/", external: true },
    { icon: <AlertTriangle className="mr-2 h-4 w-4" />, text: "Report an Incident", path: "/report" },
  ]

  return (
    <aside className="w-64 border-r p-4">
      <h1 className="text-2xl font-bold mb-4">BantayTrapiko</h1>
      <nav className="space-y-2">
        {menu_items.map(({ icon, text, path }) => (
          <Button
            asChild
            key={text}
            variant="ghost"
            className={`w-full justify-start ${pathname === path ? 'bg-accent text-accent-foreground' : ''}`}
          >
            <Link href={path}>
              {icon}
              {text}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}

