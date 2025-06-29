"use client";

import Link from "next/link";
import { useTranslation } from "@/components/translation-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Privacy() {
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
          <h2 className="text-3xl font-normal mb-8">{t('privacyPolicy')}</h2>
          
          <div className="bg-white p-8 rounded-md shadow space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">Datenschutzerklärung</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Der Schutz Ihrer persönlichen Daten ist mir, als Betreiber dieser Webseite, ein besonderes Anliegen. 
                  Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
                  sowie dieser Datenschutzerklärung.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">1. Verantwortlicher</h3>
              <div className="space-y-2">
                <p className="font-medium">Tatjana Lindenau</p>
                <p>Musterstraße 1</p>
                <p>E-Mail: dummy@email.de</p>
                <p>Telefon: 123 4567890</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Die Nutzung dieser Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. 
                  Personenbezogene Daten (z. B. Name, E-Mail-Adresse) werden nur erhoben, wenn Sie mir diese 
                  freiwillig im Rahmen einer Kontaktaufnahme zur Verfügung stellen – etwa über ein Kontaktformular 
                  oder per E-Mail.
                </p>
                <p>
                  Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht ohne 
                  Ihre ausdrückliche Zustimmung an Dritte weitergegeben.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">3. Rechtsgrundlage der Verarbeitung</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Die Verarbeitung Ihrer Daten erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
                  mit der Erfüllung eines Vertrags oder der Durchführung vorvertraglicher Maßnahmen zusammenhängt. 
                  In allen anderen Fällen beruht die Verarbeitung auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">4. Speicherdauer</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Ihre personenbezogenen Daten werden nur so lange gespeichert, wie es für die Bearbeitung 
                  Ihrer Anfrage erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">5. Ihre Rechte</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>Sie haben jederzeit das Recht auf:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Auskunft über Ihre bei mir gespeicherten personenbezogenen Daten (Art. 15 DSGVO),</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
                  <li>Löschung (Art. 17 DSGVO),</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
                  <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO),</li>
                  <li>sowie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO).</li>
                </ul>
                <p>
                  Zur Ausübung Ihrer Rechte können Sie sich jederzeit unter der im Impressum angegebenen 
                  Adresse an mich wenden.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">6. Server-Logfiles</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Der Hosting-Anbieter dieser Seite erhebt und speichert automatisch Informationen in sogenannten 
                  Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind z. B.:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browsertyp und -version</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer-URL</li>
                  <li>IP-Adresse (gekürzt/anonymisiert)</li>
                  <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p>
                  Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten 
                  mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dient der technischen 
                  Sicherheit und der Optimierung des Angebots.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">7. Kontakt</h3>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie bitte eine E-Mail an: 
                  <a href="mailto:dummy@email.de" className="text-blue-600 hover:underline ml-1">dummy@email.de</a>
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