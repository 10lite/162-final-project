"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

export default function VehicleTracking() {
  const [video, setVideo] = useState<File | null>(null)
  const [trackingMethod, setTrackingMethod] = useState("yolo")

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideo(file)
    }
  }

  const handleTrack = () => {
    // Handle vehicle tracking
    console.log("Tracking vehicles with method:", trackingMethod)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vehicle Tracking</h2>
      <div>
        <Label htmlFor="video-upload">Upload Video</Label>
        <Input id="video-upload" type="file" accept="video/*" onChange={handleUpload} />
      </div>
      <div>
        <Label htmlFor="tracking-method">Tracking Method</Label>
        <Select value={trackingMethod} onValueChange={setTrackingMethod}>
          <SelectTrigger id="tracking-method">
            <SelectValue placeholder="Select tracking method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yolo">YOLOv11</SelectItem>
            <SelectItem value="sort">SORT Algorithm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleTrack}>Start Tracking</Button>
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

