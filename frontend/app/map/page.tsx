import TrafficPatterns from "@/components/traffic-patterns"
import { MapProvider } from "@/hooks/map-provider"

export default function Map() {
  return (
    <MapProvider>
      <TrafficPatterns />
    </MapProvider>
  )
}

