"use client";

import { useTranslation } from './translation-provider';
import { Button } from './ui/button';
import { Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {currentLanguage?.name}
          </span>
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'de')}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
              language === lang.code
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
            {language === lang.code && (
              <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 