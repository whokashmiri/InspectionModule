'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { t, i18n } = useTranslation();

  // Update HTML direction on language change
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = dir;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="w-full px-6 py-4 border-b flex justify-between items-center  shadow-sm">
      <h1 className="text-xl font-semibold">
        {t('Asset Inspecto')}
      </h1>

      <Button onClick={toggleLanguage} variant="outline" size="sm" className="flex items-center gap-2">
        <Languages className="w-4 h-4" />
        {i18n.language === 'en' ? '' : ''}
      </Button>
    </header>
  );
}
