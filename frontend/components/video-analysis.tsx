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
  
  const processVideo = async (video: File) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/get_enhanced_frames`

    try {
      // Get byte array from the video file
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(video);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      console.log(base64String)
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          video: base64String,
        }),
      })
      const data = await res.json()

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Video Analysis</h2>
      <h4>Upload a video with vehicles. This will randomly select 3 frames, processes them to enhance quality, compresses them, and returns the result to the dashboard.</h4>
      <div>
        <Label htmlFor="video-upload">Upload Video</Label>
        <Input id="video-upload" type="file" accept="video/*" onChange={handleUpload} />
      </div>

      <Button onClick={() => video && processVideo(video)}>
          Process Video
      </Button>

      <Card className="w-full aspect-video flex items-center justify-center bg-gray-100">
        {video ? (
          <video src={URL.createObjectURL(video)} controls className="max-w-full max-h-full" />
        ) : (
          <p className="text-gray-500">Upload a video to see it here</p>
        )}
        {/* Returned frames from the API */}
      </Card>
    </div>
  )
}

