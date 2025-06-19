import Image from "next/image"
import Link from "next/link"
import { getAllArtworks, generateSlug } from "@/lib/db"

export default async function Home() {
  // Get featured artworks for the homepage (first 3)
  const allArtworks = await getAllArtworks()
  const featuredArtworks = [...allArtworks].sort((a, b) => a.position - b.position).slice(0, 3)

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
              <Link href="/" className="hover:underline underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featuredArtworks.length > 0
            ? featuredArtworks.map((artwork) => (
                <Link key={artwork.id} href={`/gallery/${generateSlug(artwork.title)}`} className="block group">
                  <div
                    className="w-full h-[560px] relative mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl"
                    style={{ maxWidth: "420px" }}
                  >
                    <Image
                      src={artwork.image_url || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  </div>
                </Link>
              ))
            : // Fallback placeholders if no artworks are available
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="group">
                  <div
                    className="w-full h-[560px] relative mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl"
                    style={{ maxWidth: "420px" }}
                  >
                    <Image
                      src={`/placeholder.svg?height=800&width=600&query=abstract art ${index + 1}`}
                      alt={`Abstract artwork placeholder ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  </div>
                </div>
              ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/gallery"
            className="bg-black text-white px-8 py-3 inline-block hover:bg-opacity-80 transition-colors"
          >
            To Gallery
          </Link>
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
