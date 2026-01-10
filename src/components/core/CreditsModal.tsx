import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[10001] flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-white/90 backdrop-blur-xl text-text-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('licenses.title')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10"><X size={20}/></button>
        </header>

        <div className="p-6 overflow-y-auto text-sm space-y-5">
          <div className="p-4 bg-white/70 border border-gray-200 rounded-lg space-y-2">
            <h3 className="text-base font-semibold">{t('licenses.code_title')}</h3>
            <p>{t('licenses.code_text')}</p>
            <p className="font-semibold">{t('licenses.code_license_name')}</p>
            <p className="text-gray-700">{t('licenses.code_license_desc')}</p>
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              {t('licenses.code_link_label')} <ExternalLink size={14} />
            </a>
          </div>

          <div className="p-4 bg-white/70 border border-gray-200 rounded-lg space-y-2">
            <h3 className="text-base font-semibold">{t('licenses.content_title')}</h3>
            <p>{t('licenses.content_text')}</p>
            <p className="font-semibold">{t('licenses.content_license_name')}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                title="Creative Commons Attribution-ShareAlike 4.0 International License"
              >
                <img src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" alt="Licencia Creative Commons BY-SA 4.0" />
              </a>
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                {t('licenses.content_link_label')} <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="p-4 bg-white/70 border border-gray-200 rounded-lg space-y-2">
            <h3 className="text-base font-semibold">{t('licenses.external_title')}</h3>
            <p>{t('licenses.external_text')}</p>
            <a
              href="https://github.com/escritorio-digital/escritorio-digital.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              {t('licenses.repo_link_label')} <ExternalLink size={14} />
            </a>
          </div>

          <div className="p-4 bg-white/70 border border-gray-200 rounded-lg space-y-2">
            <h3 className="text-base font-semibold">{t('licenses.principles_title')}</h3>
            <p>{t('licenses.principles_text')}</p>
            <p className="font-semibold">{t('licenses.principles_name')}</p>
            <a
              href="https://conocimiento-abierto.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              {t('licenses.principles_link_label')} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
