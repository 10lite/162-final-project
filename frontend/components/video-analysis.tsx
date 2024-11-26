"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { Switch } from "./ui/switch"
import { Card } from "./ui/card"

export default function VideoAnalysis() {
  const [video, setVideo] = useState<File | null>(null)
  const [enhancementLevel, setEnhancementLevel] = useState(50)
  const [restorationLevel, setRestorationLevel] = useState(50)
  const [compressionLevel, setCompressionLevel] = useState(50)
  const [stabilization, setStabilization] = useState(false)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideo(file)
    }
  }

  const handleProcess = () => {
    // Handle video processing
    console.log("Processing video with settings:", {
      enhancementLevel,
      restorationLevel,
      compressionLevel,
      stabilization,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Video Analysis</h2>
      <div>
        <Label htmlFor="video-upload">Upload Video</Label>
        <Input id="video-upload" type="file" accept="video/*" onChange={handleUpload} />
      </div>
      <div>
        <Label htmlFor="enhancement">Enhancement Level</Label>
        <Slider
          id="enhancement"
          min={0}
          max={100}
          step={1}
          value={[enhancementLevel]}
          onValueChange={(value) => setEnhancementLevel(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="restoration">Restoration Level</Label>
        <Slider
          id="restoration"
          min={0}
          max={100}
          step={1}
          value={[restorationLevel]}
          onValueChange={(value) => setRestorationLevel(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="compression">Compression Level</Label>
        <Slider
          id="compression"
          min={0}
          max={100}
          step={1}
          value={[compressionLevel]}
          onValueChange={(value) => setCompressionLevel(value[0])}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="stabilization" checked={stabilization} onCheckedChange={setStabilization} />
        <Label htmlFor="stabilization">Enable Video Stabilization</Label>
      </div>
      <Button onClick={handleProcess}>Process Video</Button>
      <Card className="w-full aspect-video flex items-center justify-center bg-gray-100">
        {video ? (
          <video src={URL.createObjectURL(video)} controls className="max-w-full max-h-full" />
        ) : (
          <p className="text-gray-500">Upload a video to see it here</p>
        )}
      </Card>
    </div>
  )
}

