import { NextResponse } from "next/server"
import { getAllArtworks } from "@/lib/db"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const artworks = await getAllArtworks()
    return NextResponse.json(artworks)
  } catch (error) {
    console.error("Error fetching artworks:", error)
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 })
  }
}
