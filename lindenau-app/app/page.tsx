"use client";

import Image from "next/image";
import Link from "next/link";
import { getAllArtworksClient, generateSlug } from "@/lib/db-client";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect, useState } from "react";
import type { Artwork } from "@/lib/db-client";

export default function Home() {
  const { t } = useTranslation();
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        console.log("Home page: Starting to fetch artworks...");
        const allArtworks = await getAllArtworksClient();
        console.log("Home page: Received artworks:", allArtworks);
        
        const sortedArtworks = [...allArtworks]
    .sort((a, b) => a.position - b.position)
    .slice(0, 3);
        
        console.log("Home page: Featured artworks:", sortedArtworks);
        setFeaturedArtworks(sortedArtworks);
      } catch (error) {
        console.error("Home page: Error fetching artworks:", error);
        setError("Failed to load artworks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffde9]">
        <header className="container mx-auto px-6 py-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-normal">
            <Link href="/">Tatjana Lindenau</Link>
          </h1>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="hover:underline underline">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:underline">
                    {t('gallery')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t('about')}
                  </Link>
                </li>
              </ul>
            </nav>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container mx-auto px-6 py-8 flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fffde9]">
        <header className="container mx-auto px-6 py-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-normal">
            <Link href="/">Tatjana Lindenau</Link>
          </h1>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="hover:underline underline">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:underline">
                    {t('gallery')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t('about')}
                  </Link>
                </li>
              </ul>
            </nav>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="container mx-auto px-6 py-8 flex-grow flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Please check your Supabase configuration.</p>
          </div>
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
        <div className="flex items-center gap-4">
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:underline underline">
                  {t('home')}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
                  {t('gallery')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                  {t('about')}
              </Link>
            </li>
          </ul>
        </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featuredArtworks.length > 0
            ? featuredArtworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  href={`/gallery/${generateSlug(artwork.title)}`}
                  className="block group"
                >
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
            {t('toGallery')}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-[#837e7e]">
        <div className="space-x-6">
          <Link href="/privacy" className="hover:underline">
            {t('privacyPolicy')}
          </Link>
          <Link href="/impressum" className="hover:underline">
            {t('impressum')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
