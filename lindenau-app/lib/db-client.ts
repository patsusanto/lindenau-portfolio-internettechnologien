import { getSupabaseBrowserClient } from "./supabase";

// Define the artwork type to match the actual database schema
export type Artwork = {
  id: string;
  title: string;
  description: string;
  measurements: string;
  techniques: string;
  availability: string;
  image_url: string;
  position: number;
  created_at?: string;
  updated_at?: string;
};

// Get all artworks (client-side version)
export const getAllArtworksClient = async (): Promise<Artwork[]> => {
  try {
    console.log("Fetching artworks from client...");
    const supabase = getSupabaseBrowserClient();
    
    // Test the connection first
    const { data: testData, error: testError } = await supabase
      .from("gallery_images")
      .select("count", { count: "exact", head: true });
    
    if (testError) {
      console.error("Supabase connection test failed:", testError);
      return [];
    }
    
    console.log("Supabase connection successful, fetching artworks...");
    
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("position");

    if (error) {
      console.error("Error fetching artworks:", error);
      return [];
    }

    console.log("Artworks fetched successfully:", data?.length || 0, "artworks");
    return data || [];
  } catch (error) {
    console.error("Error in getAllArtworksClient:", error);
    return [];
  }
};

// Get artwork by ID (client-side version)
export const getArtworkByIdClient = async (id: string): Promise<Artwork | null> => {
  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching artwork by ID:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getArtworkByIdClient:", error);
    return null;
  }
};

// Get artwork by slug (client-side version)
export const getArtworkBySlugClient = async (
  slug: string,
): Promise<Artwork | null> => {
  try {
    // Since we don't have a slug column, we'll convert the slug back to a title
    // and search by title
    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .ilike("title", title)
      .single();

    if (error) {
      console.error("Error fetching artwork by slug:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getArtworkBySlugClient:", error);
    return null;
  }
};

// Generate a slug from a title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}; 