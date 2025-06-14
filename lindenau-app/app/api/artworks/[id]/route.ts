import { type NextRequest, NextResponse } from "next/server"
import { getArtworkById } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const artwork = await getArtworkById(id)

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    return NextResponse.json(artwork)
  } catch (error) {
    console.error("Error fetching artwork:", error)
    return NextResponse.json({ error: "Failed to fetch artwork" }, { status: 500 })
  }
}
