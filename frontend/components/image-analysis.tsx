"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"

export default function ImageAnalysis() {
  const [image, setImage] = useState<File | null>(null)
  const [enhancementLevel, setEnhancementLevel] = useState(50)
  const [restorationLevel, setRestorationLevel] = useState(50)
  const [compressionLevel, setCompressionLevel] = useState(50)
  const data = null

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleProcess = () => {
    // Handle image processing
    console.log("Processing image with settings:", {
      enhancementLevel,
      restorationLevel,
      compressionLevel,
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Image Analysis</h2>
      <h4>Upload an enhanced image with vehicles to identify and count each vehicle and their types.</h4>
      <div>
        <Label htmlFor="image-upload">Upload Image</Label>
        <Input id="image-upload" type="file" accept="image/*" onChange={handleUpload} />
      </div>
      {/* <Button onClick={handleProcess}>Process Image</Button> */}
      <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Uploaded image" className="max-w-full max-h-full object-contain" />
        ) : (
          <p className="text-gray-500">Upload an image to see it here</p>
        )}
      </Card>
      { data &&
        <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
          
        </Card>
      }
    </div>
  )
}

