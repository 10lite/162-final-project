"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "./ui/loading";

export default function VideoAnalysis() {
  const [video, setVideo] = useState<File | null>(null);
  const [enhancementLevel, setEnhancementLevel] = useState(50);
  const [restorationLevel, setRestorationLevel] = useState(50);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [stabilization, setStabilization] = useState(false);
  const [imageData, setImageData] = useState<string[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { toast } = useToast();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleProcess = () => {
    // Handle video processing
    console.log("Processing video with settings:", {
      enhancementLevel,
      restorationLevel,
      compressionLevel,
      stabilization,
    });
  };

  const processVideo = async (video: File) => {
    setIsLoading(true); // Set loading state to true
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/get_enhanced_frames`;

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("video", video);

      // Make API call
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "An unknown error occurred");
      }

      const data = await res.json();
      setImageData(data.photos);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.toString() : "An unknown error occurred";
      console.error("Error uploading video:", errorMessage);
      toast({
        title: "Error",
        description: errorMessage, // Display the error message
        variant: "destructive", // Use destructive style for errors
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="space-y-4 relative">
      <h2 className="text-2xl font-bold">Video Analysis</h2>
      <h4>
        Upload a video with vehicles. This will randomly select 3 frames,
        process them to enhance quality, compress them, and return the results
        to the dashboard.
      </h4>
      <div>
        <Label htmlFor="video-upload">Upload Video</Label>
        <Input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleUpload}
        />
      </div>

      <Button onClick={() => video && processVideo(video)} disabled={isLoading} className="bg-yellow-500 text-black hover:bg-yellow-300">
        {isLoading ? "Processing..." : "Process Video"}
      </Button>

      <Card className="w-full aspect-video flex items-center justify-center bg-gray-100">
        {video ? (
          <video
            src={URL.createObjectURL(video)}
            controls
            className="max-w-full max-h-full"
          />
        ) : (
          <p className="text-gray-500">Upload a video to be processed.</p>
        )}
      </Card>

      <Card>
        {imageData ? (
          <div className="grid grid-cols-3 gap-4">
            {imageData.map((image: string, index: number) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Frame ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                onClick={() => setSelectedImage(image)} // Open dialog with clicked image
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 p-3">
            Process the video to see the results
          </p>
        )}
      </Card>

      {/* Dialog for displaying the selected image */}
      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="w-[70vw] h-[80vh] max-w-full max-h-full flex flex-col items-center justify-center">
            <Button
              onClick={() => {
              const link = document.createElement("a");
              link.href = `data:image/jpeg;base64,${selectedImage}`;
              link.download = "enhanced_frame.jpg";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              }}
            >
              Download Image
            </Button>
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Selected frame"
                className="max-w-full max-h-full rounded-lg shadow-lg"
              />
            </div>
          </DialogContent>
          <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          </DialogFooter>
        </Dialog>
      )}

      {isLoading && (
        <Loading size="w-16 h-16" />
      )}
    </div>
  );
}
