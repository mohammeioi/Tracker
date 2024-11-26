import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white/90 transition-colors"
      title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Languages className="w-6 h-6 text-gray-700" />
    </button>
  );
}