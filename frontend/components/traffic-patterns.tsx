"use client"

import { Card } from "@/components/ui/card"
import TrafficMap from "@/components/traffic-map"
import { useMemo } from "react"

export default function TrafficPatterns() {
  const memoizedTrafficMap = useMemo(() => <TrafficMap key="traffic-map" />, [])

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Davao Traffic</h2>
      <h4>Real-time vehicular traffic map of Davao City.</h4>
      <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
        {memoizedTrafficMap}
      </Card>
    </div>
  )
}

