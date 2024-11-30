"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import VideoAnalysis from "./video-analysis"
import ImageAnalysis from "./image-analysis"
import EnhanceImage from "./enhance-image"

// Define a type for tab information
type TabInfo = {
  value: string;
  label: string;
  component: JSX.Element;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("video")

  // Array of tab information
  const tabs: TabInfo[] = [
    { value: "enhance", label: "Enhance Traffic Image", component: <EnhanceImage /> },
    { value: "image", label: "Image Analysis", component: <ImageAnalysis /> },
    { value: "video", label: "Video Analysis", component: <VideoAnalysis /> },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  )
}

