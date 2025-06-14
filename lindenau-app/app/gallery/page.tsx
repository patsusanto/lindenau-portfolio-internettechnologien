import Image from "next/image"
import Link from "next/link"
import { getAllArtworks } from "@/lib/db"
import { generateSlug } from "@/lib/db"

export default async function Gallery() {
  // Get artworks from the database
  const artworks = await getAllArtworks()

  // Sort artworks by position
  const sortedArtworks = [...artworks].sort((a, b) => a.position - b.position)

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
        <h2 className="text-2xl mb-8">Gallery</h2>

        {/* Gallery Grid - Images with 560px height and 420px width */}
        {sortedArtworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No artworks available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {sortedArtworks.map((artwork) => (
              <Link key={artwork.id} href={`/gallery/${generateSlug(artwork.title)}`} className="block">
                <div className="w-full h-[560px] relative mx-auto" style={{ maxWidth: "420px" }}>
                  <Image
                    src={artwork.image_url || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
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
