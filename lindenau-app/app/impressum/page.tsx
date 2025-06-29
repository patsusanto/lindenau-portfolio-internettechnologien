"use client";

import Link from "next/link";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Impressum() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#fffde9]">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-normal">
          <Link href="/">Tatjana Lindenau</Link>
        </h1>
        <LanguageSwitcher />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal mb-8">{t('impressum')}</h2>
          
          <div className="bg-white p-8 rounded-md shadow space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">Anbieter dieser Internetseite ist:</h3>
              <div className="space-y-2">
                <p className="font-medium">Tatjana Lindenau</p>
                <p>Musterstraße 1</p>
                <p>94469 Deggendorf</p>
                <p>Telefon: 123 4567890</p>
                <p>E-Mail: dummy@email.de</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Inhaltlich Verantwortlicher gemäß §18 Abs. 2 MStV:</h3>
              <p>Tatjana Lindenau</p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Urheberrecht</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
                  Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p>
                  Downloads und Kopien dieser Seite sind weder für den privaten, noch kommerziellen Gebrauch gestattet. 
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. 
                  Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                </p>
                <p>
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. 
                  Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
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