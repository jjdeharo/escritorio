import React from 'react';
import { BookOpen, LayoutGrid, Info, Scale, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide: () => void;
  onOpenCatalog: () => void;
  onOpenAbout: () => void;
  onOpenLicenses: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenGuide,
  onOpenCatalog,
  onOpenAbout,
  onOpenLicenses,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[10001] flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white/90 backdrop-blur-xl text-text-dark rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('help.title')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10">
            <X size={20} />
          </button>
        </header>

        <div className="p-6 grid gap-3 text-sm">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white/70 hover:bg-white transition"
          >
            <BookOpen size={20} className="text-gray-700" />
            <span className="font-semibold">{t('help.guide')}</span>
          </button>
          <button
            onClick={onOpenCatalog}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white/70 hover:bg-white transition"
          >
            <LayoutGrid size={20} className="text-gray-700" />
            <span className="font-semibold">{t('help.catalog')}</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white/70 hover:bg-white transition"
          >
            <Info size={20} className="text-gray-700" />
            <span className="font-semibold">{t('help.about')}</span>
          </button>
          <button
            onClick={onOpenLicenses}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white/70 hover:bg-white transition"
          >
            <Scale size={20} className="text-gray-700" />
            <span className="font-semibold">{t('help.licenses')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
