import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { withBaseUrl } from '../../../utils/assetPaths';
import type { WidgetConfig } from '../../../types';

export const widgetConfig: Omit<WidgetConfig, 'component'> = {
    id: 'edumedia-iag',
    title: 'widgets.edumedia_iag.title',
    searchKeywords: ['widgets.edumedia_iag.search_keywords'],
    icon: (() => {
        const WidgetIcon: FC = () => {
            const { t } = useTranslation();
            return (
                <img
                    src={withBaseUrl('icons/EduMedia-IAG.png')}
                    alt={t('widgets.edumedia_iag.title')}
                    width={52}
                    height={52}
                />
            );
        };
        return <WidgetIcon />;
    })(),
    defaultSize: { width: 940, height: 640 },
};
