"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function About() {
  const { t } = useTranslation();

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
              <Link href="/gallery" className="hover:underline">
                  {t('gallery')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline underline">
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
        <h2 className="text-2xl mb-8">{t('aboutTitle')}</h2>

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20200809_183139-1.jpg-4EKlciyxKjqHKgbRZRpmssSAAMig1E.jpeg"
              alt="Tatjana Lindenau in a garden with flowers"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <blockquote className="text-lg italic mb-6 leading-relaxed">
              {t('aboutQuote')}
            </blockquote>
            <p className="text-right">{t('aboutQuoteAuthor')}</p>
          </div>
        </div>

        {/* Contact Section */}
        <h2 className="text-2xl mb-8">{t('contact')}</h2>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
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
