"use server"

import { revalidatePath } from "next/cache"
import { addArtwork, updateArtwork, deleteArtwork, updateArtworkPositions } from "@/lib/db"

// Add a new artwork
export async function createArtwork(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const measurements = formData.get("measurements") as string
    const techniques = formData.get("techniques") as string
    const availability = formData.get("availability") as string
    const imageFile = formData.get("image") as File

    if (!title || !description || !measurements || !techniques || !availability || !imageFile) {
      return { success: false, message: "All fields are required" }
    }

    const newArtwork = await addArtwork(
      {
        title,
        description,
        measurements,
        techniques,
        availability,
      },
      imageFile,
    )

    if (!newArtwork) {
      return { success: false, message: "Failed to create artwork" }
    }

    revalidatePath("/gallery")
    revalidatePath("/galleryadmin")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error creating artwork:", error)
    return { success: false, message: "Failed to create artwork" }
  }
}

// Update an existing artwork
export async function updateArtworkAction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const measurements = formData.get("measurements") as string
    const techniques = formData.get("techniques") as string
    const availability = formData.get("availability") as string
    const position = Number.parseInt(formData.get("position") as string) - 1
    const imageFile = formData.get("image") as File

    if (!title || !description || !measurements || !techniques || !availability) {
      return { success: false, message: "Required fields are missing" }
    }

    const updatedArtwork = await updateArtwork(
      id,
      {
        title,
        description,
        measurements,
        techniques,
        availability,
        position,
      },
      imageFile.size > 0 ? imageFile : undefined,
    )

    if (!updatedArtwork) {
      return { success: false, message: "Artwork not found" }
    }

    revalidatePath("/gallery")
    revalidatePath("/galleryadmin")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error updating artwork:", error)
    return { success: false, message: "Failed to update artwork" }
  }
}

// Delete an artwork
export async function deleteArtworkAction(id: string) {
  try {
    const success = await deleteArtwork(id)

    if (!success) {
      return { success: false, message: "Artwork not found" }
    }

    revalidatePath("/gallery")
    revalidatePath("/galleryadmin")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting artwork:", error)
    return { success: false, message: "Failed to delete artwork" }
  }
}

// Update artwork positions
export async function updatePositionsAction(positions: { id: string; position: number }[]) {
  try {
    const success = await updateArtworkPositions(positions)

    if (!success) {
      return { success: false, message: "Failed to update positions" }
    }

    revalidatePath("/gallery")
    revalidatePath("/galleryadmin")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error updating positions:", error)
    return { success: false, message: "Failed to update positions" }
  }
}
