"use client";

import Image from "next/image";
import Link from "next/link";
import { getAllArtworksClient, generateSlug } from "@/lib/db-client";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect, useState } from "react";
import type { Artwork } from "@/lib/db-client";

export default function Gallery() {
  const { t } = useTranslation();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const fetchedArtworks = await getAllArtworksClient();
        setArtworks(fetchedArtworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Sort artworks by position
  const sortedArtworks = [...artworks].sort((a, b) => a.position - b.position);

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
                  <Link href="/" className="hover:underline">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:underline underline">
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
              <Link href="/" className="hover:underline">
                  {t('home')}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline underline">
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
        <h2 className="text-2xl mb-8">{t('galleryTitle')}</h2>

        {/* Gallery Grid - Images with 560px height and 420px width */}
        {sortedArtworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">{t('noArtworksAvailable')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {sortedArtworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/gallery/${generateSlug(artwork.title)}`}
                className="block group"
              >
                <div
                  className="w-full h-[560px] relative mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  style={{ maxWidth: "420px" }}
                >
                  <Image
                    src={artwork.image_url || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-lg font-medium">{artwork.title}</h3>
                    <p className="text-sm opacity-90">{artwork.techniques}</p>
                  </div>
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
