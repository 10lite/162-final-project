"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "./ui/loading";

export default function ImageAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null); // Store annotated image data
  const [numberOfVehicles, setNumberOfVehicles] = useState<{
    [key: string]: number;
  } | null>(null); // Store vehicle count
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { toast } = useToast();

  const detectVehicles = async (image: File) => {
    setIsLoading(true); // Set loading state
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/detect_vehicles`;

    try {
      // Prepare FormData for API call
      const formData = new FormData();
      formData.append("input", image);

      // Make API call to detect vehicles
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to process image");
      }

      const data = await res.json();
      console.log(data);

      // Set the annotated image and vehicle count
      setImageData(data.photo); // Set the base64 annotated image
      setNumberOfVehicles(data.count); // Set vehicle count (car, bus, truck, etc.)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.toString() : "An error occurred";
      console.error("Error processing image:", errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // Set the uploaded image file
    }
  };

  const handleProcess = () => {
    if (image) {
      detectVehicles(image); // Process the image when the button is clicked
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Image Analysis</h2>
      <h4>
        Upload an enhanced image with vehicles to identify and count each
        vehicle and their types.
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

      <Button onClick={handleProcess} disabled={isLoading}>
        {isLoading ? "Processing..." : "Process Image"}
      </Button>

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

      {/* Display the annotated image after processing */}
      {imageData && (
        <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100">
          <img
            src={`data:image/jpeg;base64,${imageData}`}
            alt="Annotated Image"
            className="max-w-full max-h-full object-contain"
          />
        </Card>
      )}

      {/* Display the number of vehicles detected */}
      {numberOfVehicles && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(numberOfVehicles).map(([vehicleType, count]) => (
            <Card key={vehicleType} className="p-4">
              <h3 className="text-lg font-semibold">
                {vehicleType.charAt(0).toUpperCase() +
                  vehicleType.slice(1).toLowerCase()}
              </h3>
              <p>{count} vehicles detected</p>
            </Card>
          ))}
        </div>
      )}

      {isLoading && <Loading size="w-16 h-16" />}
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
// import { useToast } from "@/hooks/use-toast";
// import { Loading } from "./ui/loading";

// export default function ImageAnalysis() {
//   const [image, setImage] = useState<File | null>(null);
//   const [enhancementLevel, setEnhancementLevel] = useState(50);
//   const [restorationLevel, setRestorationLevel] = useState(50);
//   const [compressionLevel, setCompressionLevel] = useState(50);
//   const [imageData, setImageData] = useState<string[] | null>(null);
//   const [numberOfVehicles, setNumberOfVehicles] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const { toast } = useToast();
//   const data = null;

//   const detectVehicles = async (image: File) => {
//     setIsLoading(true); // Set loading
//     const url = `${process.env.NEXT_PUBLIC_API_URL}/api/detect_vehicles`;

//     try {
//       // Prepare FormData
//       const formData = new FormData();
//       formData.append("input", image);

//       // Make API call
//       const res = await fetch(url, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.detail || "Failed to process image");
//       }

//       const data = await res.json();
//       console.log(data);
//       setImageData(data.photo);
//       setNumberOfVehicles(data.count);
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.toString() : "An error occurred";
//       console.error("Error processing image:", errorMessage);
//       toast({
//         title: "Error",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//       <h2 className="text-2xl font-bold">Image Analysis</h2>
//       <h4>
//         Upload an enhanced image with vehicles to identify and count each
//         vehicle and their types.
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
//       {/* <Button onClick={handleProcess}>Process Image</Button> */}
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
//       {data && (
//         <Card className="w-full aspect-video flex items-center p-6 justify-center bg-gray-100"></Card>
//       )}

//       {isLoading && <Loading size="w-16 h-16" />}
//     </div>
//   );
// }
