import { createServerSupabaseClient } from "./supabase"
import { v4 as uuidv4 } from "uuid"
import { put } from "@vercel/blob"

// Define the artwork type to match the actual database schema
export type Artwork = {
  id: string
  title: string
  description: string
  measurements: string
  techniques: string
  availability: string
  image_url: string
  position: number
  created_at?: string
  updated_at?: string
}

// Get all artworks
export const getAllArtworks = async (): Promise<Artwork[]> => {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("gallery_images").select("*").order("position")

    if (error) {
      console.error("Error fetching artworks:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllArtworks:", error)
    return []
  }
}

// Get artwork by ID
export const getArtworkById = async (id: string): Promise<Artwork | null> => {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("gallery_images").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching artwork by ID:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getArtworkById:", error)
    return null
  }
}

// Get artwork by slug (we'll use title as slug for now)
export const getArtworkBySlug = async (slug: string): Promise<Artwork | null> => {
  try {
    // Since we don't have a slug column, we'll convert the slug back to a title
    // and search by title
    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("gallery_images").select("*").ilike("title", title).single()

    if (error) {
      console.error("Error fetching artwork by slug:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getArtworkBySlug:", error)
    return null
  }
}

// Add a new artwork
export const addArtwork = async (
  artwork: Omit<Artwork, "id" | "created_at" | "updated_at" | "position" | "image_url">,
  imageFile: File,
): Promise<Artwork | null> => {
  try {
    // Upload image to Vercel Blob
    const slug = generateSlug(artwork.title)
    const { url } = await put(`artworks/${slug}-${Date.now()}.${imageFile.name.split(".").pop()}`, imageFile, {
      access: "public",
    })

    // Get the current count of artworks to determine position
    const supabase = createServerSupabaseClient()
    const { count } = await supabase.from("gallery_images").select("*", { count: "exact", head: true })

    const position = count || 0

    // Create new artwork object - only include fields that exist in the database
    const newArtwork = {
      id: uuidv4(),
      title: artwork.title,
      description: artwork.description,
      measurements: artwork.measurements,
      techniques: artwork.techniques,
      availability: artwork.availability,
      image_url: url,
      position,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert into database
    const { data, error } = await supabase.from("gallery_images").insert(newArtwork).select().single()

    if (error) {
      console.error("Error adding artwork:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in addArtwork:", error)
    return null
  }
}

// Update an existing artwork
export const updateArtwork = async (
  id: string,
  artworkData: Partial<Artwork>,
  imageFile?: File,
): Promise<Artwork | null> => {
  try {
    const supabase = createServerSupabaseClient()

    // Prepare update data - only include fields that exist in the database
    const updateData: Partial<Artwork> = {
      title: artworkData.title,
      description: artworkData.description,
      measurements: artworkData.measurements,
      techniques: artworkData.techniques,
      availability: artworkData.availability,
      position: artworkData.position,
      updated_at: new Date().toISOString(),
    }

    // If a new image was uploaded
    if (imageFile && imageFile.size > 0) {
      const slug = generateSlug(artworkData.title || "artwork")
      const { url } = await put(`artworks/${slug}-${id}-updated.${imageFile.name.split(".").pop()}`, imageFile, {
        access: "public",
      })
      updateData.image_url = url
    }

    // Update in database
    const { data, error } = await supabase.from("gallery_images").update(updateData).eq("id", id).select().single()

    if (error) {
      console.error("Error updating artwork:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in updateArtwork:", error)
    return null
  }
}

// Delete an artwork
export const deleteArtwork = async (id: string): Promise<boolean> => {
  try {
    const supabase = createServerSupabaseClient()

    // Delete from database
    const { error } = await supabase.from("gallery_images").delete().eq("id", id)

    if (error) {
      console.error("Error deleting artwork:", error)
      return false
    }

    // Update positions for remaining artworks
    await updatePositionsAfterDelete(supabase)

    return true
  } catch (error) {
    console.error("Error in deleteArtwork:", error)
    return false
  }
}

// Helper function to update positions after deletion
// TODO: Replace 'any' with the actual Supabase client type if available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePositionsAfterDelete = async (supabase: any) => {
  try {
    // Get all artworks ordered by position
    const { data, error } = await supabase.from("gallery_images").select("id, position").order("position")

    if (error) {
      console.error("Error fetching artworks for position update:", error)
      return
    }

    // Update positions
    for (let i = 0; i < data.length; i++) {
      await supabase.from("gallery_images").update({ position: i }).eq("id", data[i].id)
    }
  } catch (error) {
    console.error("Error updating positions after delete:", error)
  }
}

// Update artwork positions
export const updateArtworkPositions = async (
  artworkPositions: { id: string; position: number }[],
): Promise<boolean> => {
  try {
    const supabase = createServerSupabaseClient()

    // Update each artwork's position
    for (const { id, position } of artworkPositions) {
      const { error } = await supabase
        .from("gallery_images")
        .update({ position, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) {
        console.error(`Error updating position for artwork ${id}:`, error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error("Error in updateArtworkPositions:", error)
    return false
  }
}

// Generate a slug from a title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
}
