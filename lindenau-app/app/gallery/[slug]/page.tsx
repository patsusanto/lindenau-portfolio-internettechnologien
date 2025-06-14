import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArtworkBySlug } from "@/lib/db"

export default async function ArtworkDetail({ params }: { params: { slug: string } }) {
  const artwork = await getArtworkBySlug(params.slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffde9]">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-normal">
          <Link href="/">Tatjana Lindenau</Link>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About & Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <Link href="/gallery" className="inline-block mb-8 hover:underline">
          ← Back to Gallery
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Artwork Image - Original aspect ratio */}
          <div className="w-full h-[560px] relative">
            <Image
              src={artwork.image_url || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Artwork Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl mb-6">{artwork.title}</h2>

            <div className="space-y-4">
              <p className="text-lg">{artwork.description}</p>

              <div className="mt-8 space-y-2">
                <p>
                  <span className="font-medium">Measurements:</span> {artwork.measurements}
                </p>
                <p>
                  <span className="font-medium">Techniques:</span> {artwork.techniques}
                </p>
                <p>
                  <span className="font-medium">Availability:</span>{" "}
                  <span className={artwork.availability === "Sold" ? "text-red-600" : "text-green-600"}>
                    {artwork.availability}
                  </span>
                </p>
              </div>

              {artwork.availability === "Available" && (
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="bg-black text-white px-6 py-2 inline-block hover:bg-opacity-80 transition-colors"
                  >
                    Inquire About This Piece
                  </Link>
                </div>
              )}
            </div>
          </div>
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
  )
}
