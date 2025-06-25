"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import { updateArtworkAction } from "@/app/actions";
import { useToast } from "@/components/toast-provider";
import { ProtectedRoute } from "@/components/protected-route";

function EditArtworkContent({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    measurements: "",
    techniques: "",
    availability: "",
    position: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [artworkCount, setArtworkCount] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const artworkId = params.id;

  // Load artwork data
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // Fetch the specific artwork
        const response = await fetch(`/api/artworks/${artworkId}`);
        if (!response.ok) throw new Error("Failed to fetch artwork");
        const artwork = await response.json();

        // Fetch all artworks to get the count
        const allResponse = await fetch("/api/artworks");
        if (!allResponse.ok) throw new Error("Failed to fetch artworks");
        const allArtworks = await allResponse.json();

        setFormData({
          title: artwork.title,
          description: artwork.description,
          measurements: artwork.measurements,
          techniques: artwork.techniques,
          availability: artwork.availability,
          position: artwork.position,
        });
        setPreviewUrl(artwork.image_url);
        setArtworkCount(allArtworks.length);
      } catch (error) {
        console.error("Error fetching artwork:", error);
        toast({
          title: "Error",
          description: "Failed to load artwork",
          type: "error",
        });
        router.push("/galleryadmin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId, router, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a FormData object to submit
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("measurements", formData.measurements);
      formDataToSubmit.append("techniques", formData.techniques);
      formDataToSubmit.append("availability", formData.availability);
      formDataToSubmit.append("position", formData.position.toString());

      if (imageFile) {
        formDataToSubmit.append("image", imageFile);
      } else {
        // Add an empty file to indicate no new image
        formDataToSubmit.append(
          "image",
          new Blob([], { type: "application/octet-stream" }),
        );
      }

      const result = await updateArtworkAction(artworkId, formDataToSubmit);

      if (result.success) {
        toast({
          title: "Success",
          description: "Artwork updated successfully",
          type: "success",
        });
        router.push("/galleryadmin");
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update artwork",
          type: "error",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= artworkCount) {
      setFormData((prev) => ({ ...prev, position: value - 1 }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffde9]">
        <header className="container mx-auto px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-normal">
            <Link href="/">Tatjana Lindenau</Link>
          </h1>
        </header>
        <main className="container mx-auto px-6 py-8 flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffde9]">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-normal">
          <Link href="/">Tatjana Lindenau</Link>
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Gallery Admin</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/galleryadmin")}
            className="flex items-center text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <h2 className="text-2xl mb-8">Edit Artwork</h2>

        <div className="bg-white p-6 shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Image upload */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-80">
                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // For edit, we don't want to completely remove the image
                          // Just allow replacing it
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-white"
                      >
                        Replace
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500 mb-2">
                        Click or drag image to upload
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="artwork-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${previewUrl && !imageFile ? "hidden" : ""}`}
                  />
                </div>

                <div>
                  <Label htmlFor="position">
                    Position in Gallery (1-{artworkCount})
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    type="number"
                    min={1}
                    max={artworkCount}
                    value={formData.position + 1}
                    onChange={handlePositionChange}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This determines the order in which artworks appear in the
                    gallery.
                  </p>
                </div>
              </div>

              {/* Right column - Artwork details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Artwork title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the artwork..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="measurements">Measurements</Label>
                  <Input
                    id="measurements"
                    name="measurements"
                    value={formData.measurements}
                    onChange={handleInputChange}
                    placeholder="e.g., 80x100cm"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="techniques">Techniques</Label>
                  <Input
                    id="techniques"
                    name="techniques"
                    value={formData.techniques}
                    onChange={handleInputChange}
                    placeholder="e.g., Acrylic on canvas"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) =>
                      handleSelectChange("availability", value)
                    }
                  >
                    <SelectTrigger id="availability">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/galleryadmin")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black hover:bg-black/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update Artwork"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-[#837e7e]">
        <div className="space-x-6">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default function EditArtwork({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <EditArtworkContent params={params} />
    </ProtectedRoute>
  );
}
