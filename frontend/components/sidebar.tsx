import { Button } from "./ui/button"
import { CarIcon, VideoIcon, ImageIcon, BarChartIcon } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <VideoIcon className="mr-2 h-4 w-4" />
          Video Analysis
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ImageIcon className="mr-2 h-4 w-4" />
          Image Analysis
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <CarIcon className="mr-2 h-4 w-4" />
          Vehicle Tracking
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <BarChartIcon className="mr-2 h-4 w-4" />
          Traffic Patterns
        </Button>
      </nav>
    </aside>
  )
}

