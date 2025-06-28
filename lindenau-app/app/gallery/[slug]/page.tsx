"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkBySlugClient } from "@/lib/db-client";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect, useState } from "react";
import type { Artwork } from "@/lib/db-client";

export default function ArtworkDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { t } = useTranslation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const fetchedArtwork = await getArtworkBySlugClient(params.slug);
        if (!fetchedArtwork) {
          setError("Artwork not found");
        } else {
          setArtwork(fetchedArtwork);
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
        setError("Failed to load artwork");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [params.slug]);

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

  if (error || !artwork) {
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
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Artwork not found"}</p>
            <Link href="/gallery" className="text-blue-600 hover:underline">
              {t('backToGallery')}
            </Link>
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
        <Link href="/gallery" className="inline-block mb-8 hover:underline">
          {t('backToGallery')}
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
                  <span className="font-medium">{t('measurements')}:</span>{" "}
                  {artwork.measurements}
                </p>
                <p>
                  <span className="font-medium">{t('techniques')}:</span>{" "}
                  {artwork.techniques}
                </p>
                <p>
                  <span className="font-medium">{t('availability')}:</span>{" "}
                  <span
                    className={
                      artwork.availability === "Sold"
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {artwork.availability === "Available" ? t('available') : t('sold')}
                  </span>
                </p>
              </div>

              {artwork.availability === "Available" && (
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="bg-black text-white px-6 py-2 inline-block hover:bg-opacity-80 transition-colors"
                  >
                    {t('inquireAboutPiece')}
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
