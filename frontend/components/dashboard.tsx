"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import VideoAnalysis from "./video-analysis"
import ImageAnalysis from "./image-analysis"
import VehicleTracking from "./vehicle-tracking"
import TrafficPatterns from "./traffic-patterns"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("video")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="video">Video Analysis</TabsTrigger>
        <TabsTrigger value="image">Image Analysis</TabsTrigger>
        <TabsTrigger value="tracking">Vehicle Tracking</TabsTrigger>
        <TabsTrigger value="patterns">Traffic Patterns</TabsTrigger>
      </TabsList>
      <TabsContent value="video">
        <VideoAnalysis />
      </TabsContent>
      <TabsContent value="image">
        <ImageAnalysis />
      </TabsContent>
      <TabsContent value="tracking">
        <VehicleTracking />
      </TabsContent>
      <TabsContent value="patterns">
        <TrafficPatterns />
      </TabsContent>
    </Tabs>
  )
}

