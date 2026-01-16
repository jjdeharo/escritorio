import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { withBaseUrl } from '../../../utils/assetPaths';
import type { WidgetConfig } from '../../../types';

export const widgetConfig: Omit<WidgetConfig, 'component'> = {
    id: 'comunidad-chatgpt-ia-edu',
    title: 'widgets.chatgpt_ia_edu.title',
    searchKeywords: ['widgets.chatgpt_ia_edu.search_keywords'],
    icon: (() => {
        const WidgetIcon: FC = () => {
            const { t } = useTranslation();
            return (
                <img
                    src={withBaseUrl('icons/ComunidadChatGPT-IA-edu.png')}
                    alt={t('widgets.chatgpt_ia_edu.title')}
                    width={52}
                    height={52}
                />
            );
        };
        return <WidgetIcon />;
    })(),
    defaultSize: { width: 900, height: 620 },
};
