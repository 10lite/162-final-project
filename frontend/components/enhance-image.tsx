"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a useToast hook for showing toasts
import { Loading } from "./ui/loading"; // Assuming you have a Loading component for the spinner

export default function EnhanceImage() {
  const [image, setImage] = useState<File | null>(null);
  const [enhancementLevel, setEnhancementLevel] = useState(0.5);
  const [restorationLevel, setRestorationLevel] = useState(0.5);
  const [compressionLevel, setCompressionLevel] = useState(0.5);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null); // For displaying the enhanced image
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { toast } = useToast();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;

    setIsLoading(true); // Show loading spinner

    const formData = new FormData();
    formData.append("image", image);

    try {
      const parameters = new URLSearchParams({
        enhancement_level: enhancementLevel.toString(),
        restoration_level: restorationLevel.toString(),
        compression_level: compressionLevel.toString(),
      });
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enhance_image`
      );
      url.search = parameters.toString();

      const response = await fetch(url.toString(), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to enhance image");
      }

      const data = await response.json();
      setEnhancedImage(data.enhanced_image); // Set the base64 encoded image
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.error("Error processing image:", errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive", // Assuming you have a "destructive" variant for error toasts
      });
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Enhance Traffic Image</h2>
      <h4>
        Upload an image with vehicles to enhance quality, restore details, and
        compress the image for better analysis.
      </h4>
      <div>
        <Label htmlFor="image-upload">Upload Image</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      <div>
        <Label htmlFor="enhancement">Enhancement Level</Label>
        <Slider
          id="enhancement"
          min={0.1}
          max={1}
          step={0.1}
          value={[enhancementLevel]}
          onValueChange={(value) => setEnhancementLevel(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="restoration">Restoration Level</Label>
        <Slider
          id="restoration"
          min={0}
          max={1}
          step={0.1}
          value={[restorationLevel]}
          onValueChange={(value) => setRestorationLevel(value[0])}
        />
      </div>
      <div>
        <Label htmlFor="compression">Compression Level</Label>
        <Slider
          id="compression"
          min={0}
          max={1}
          step={0.1}
          value={[compressionLevel]}
          onValueChange={(value) => setCompressionLevel(value[0])}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleProcess} disabled={isLoading}>
          {isLoading ? "Processing..." : "Process Image"}
        </Button>
        {enhancedImage && (
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = `data:image/jpeg;base64,${enhancedImage}`;
              link.download = "enhanced_image.jpg";
              link.click();
            }}
          >
            Download Image
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <Loading size="w-16 h-16" />
        </div>
      )}

      <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded image"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-gray-500">Upload an image to see it here</p>
        )}
      </Card>

      {enhancedImage && (
        <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
          <img
            src={`data:image/jpeg;base64,${enhancedImage}`}
            alt="Enhanced image"
            className="max-w-full max-h-full object-contain"
          />
        </Card>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { Card } from "@/components/ui/card";

// export default function EnhanceImage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [enhancementLevel, setEnhancementLevel] = useState(0.5);
//   const [restorationLevel, setRestorationLevel] = useState(0.5);
//   const [compressionLevel, setCompressionLevel] = useState(0.5);

//   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleProcess = () => {
//     // Handle image processing
//     console.log("Processing image with settings:", {
//       enhancementLevel,
//       restorationLevel,
//       compressionLevel,
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Enhance Traffic Image</h2>
//       <h4>
//         Upload an image with vehicles to enhance quality, restore details, and
//         compress the image for better analysis.
//       </h4>
//       <div>
//         <Label htmlFor="image-upload">Upload Image</Label>
//         <Input
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleUpload}
//         />
//       </div>
//       <div>
//         <Label htmlFor="enhancement">Enhancement Level</Label>
//         <Slider
//           id="enhancement"
//           min={0}
//           max={1}
//           step={0.1}
//           value={[enhancementLevel]}
//           onValueChange={(value) => setEnhancementLevel(value[0])}
//         />
//       </div>
//       <div>
//         <Label htmlFor="restoration">Restoration Level</Label>
//         <Slider
//           id="restoration"
//           min={0}
//           max={1}
//           step={0.1}
//           value={[restorationLevel]}
//           onValueChange={(value) => setRestorationLevel(value[0])}
//         />
//       </div>
//       <div>
//         <Label htmlFor="compression">Compression Level</Label>
//         <Slider
//           id="compression"
//           min={0}
//           max={1}
//           step={0.1}
//           value={[compressionLevel]}
//           onValueChange={(value) => setCompressionLevel(value[0])}
//         />
//       </div>
//       <div className="flex gap-4">
//         <Button onClick={handleProcess}>Process Image</Button>
//         <Button onClick={handleProcess}>Download Image</Button>
//       </div>
//       <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
//         {image ? (
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Uploaded image"
//             className="max-w-full max-h-full object-contain"
//           />
//         ) : (
//           <p className="text-gray-500">Upload an image to see it here</p>
//         )}
//       </Card>
//     </div>
//   );
// }
