import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './EduMediaIAGWidget.css';

type LinkCard = {
    titleKey: string;
    textKey: string;
    buttonKey: string;
    url: string;
};

type LinkSection = {
    titleKey: string;
    items: LinkCard[];
};

const sections: LinkSection[] = [
    {
        titleKey: 'widgets.edumedia_iag.section_main',
        items: [
            {
                titleKey: 'widgets.edumedia_iag.link_telegram_title',
                textKey: 'widgets.edumedia_iag.link_telegram_text',
                buttonKey: 'widgets.edumedia_iag.link_telegram_button',
                url: 'https://t.me/EduMediaIAG',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_weekly_title',
                textKey: 'widgets.edumedia_iag.link_weekly_text',
                buttonKey: 'widgets.edumedia_iag.link_weekly_button',
                url: 'https://edumedia-iag.github.io/boletin_semanal/',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_agent_title',
                textKey: 'widgets.edumedia_iag.link_agent_text',
                buttonKey: 'widgets.edumedia_iag.link_agent_button',
                url: 'https://ja.cat/agente_edumedia',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_superagent_title',
                textKey: 'widgets.edumedia_iag.link_superagent_text',
                buttonKey: 'widgets.edumedia_iag.link_superagent_button',
                url: 'https://ja.cat/superagenteIA',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_multiprompts_title',
                textKey: 'widgets.edumedia_iag.link_multiprompts_text',
                buttonKey: 'widgets.edumedia_iag.link_multiprompts_button',
                url: 'https://ja.cat/multiprompts',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_visualprompts_title',
                textKey: 'widgets.edumedia_iag.link_visualprompts_text',
                buttonKey: 'widgets.edumedia_iag.link_visualprompts_button',
                url: 'https://ja.cat/visualprompts',
            },
        ],
    },
    {
        titleKey: 'widgets.edumedia_iag.section_connections',
        items: [
            {
                titleKey: 'widgets.edumedia_iag.link_chatgpt_title',
                textKey: 'widgets.edumedia_iag.link_chatgpt_text',
                buttonKey: 'widgets.edumedia_iag.link_chatgpt_button',
                url: 'https://chatgpt-ia-edu.github.io/',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_vce_title',
                textKey: 'widgets.edumedia_iag.link_vce_text',
                buttonKey: 'widgets.edumedia_iag.link_vce_button',
                url: 'https://vibe-coding-educativo.github.io/',
            },
            {
                titleKey: 'widgets.edumedia_iag.link_open_title',
                textKey: 'widgets.edumedia_iag.link_open_text',
                buttonKey: 'widgets.edumedia_iag.link_open_button',
                url: 'https://bilateria.org/app/',
            },
        ],
    },
];

export const EduMediaIAGWidget = () => {
    const { t } = useTranslation();

    return (
        <section className="edumedia-widget">
            <header className="edumedia-header">
                <div>
                    <div className="edumedia-title">{t('widgets.edumedia_iag.title')}</div>
                    <div className="edumedia-subtitle">{t('widgets.edumedia_iag.subtitle')}</div>
                </div>
                <a
                    className="edumedia-cta"
                    href="https://t.me/EduMediaIAG"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLink size={16} />
                    {t('widgets.edumedia_iag.open_telegram')}
                </a>
            </header>

            <div className="edumedia-body">
                <div className="edumedia-intro">
                    <p>{t('widgets.edumedia_iag.intro_p1')}</p>
                    <p>{t('widgets.edumedia_iag.intro_p2')}</p>
                    <p>{t('widgets.edumedia_iag.intro_p3')}</p>
                    <div className="edumedia-note">{t('widgets.edumedia_iag.note_no_iframe')}</div>
                </div>

                {sections.map((section) => (
                    <div key={section.titleKey} className="edumedia-section">
                        <h3>{t(section.titleKey)}</h3>
                        <div className="edumedia-grid">
                            {section.items.map((item) => (
                                <article key={item.titleKey} className="edumedia-card">
                                    <div>
                                        <h4>{t(item.titleKey)}</h4>
                                        <p>{t(item.textKey)}</p>
                                    </div>
                                    <a
                                        className="edumedia-link"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink size={16} />
                                        {t(item.buttonKey)}
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="edumedia-section">
                    <h3>{t('widgets.edumedia_iag.videos_title')}</h3>
                    <div className="edumedia-card edumedia-card-muted">
                        <p>{t('widgets.edumedia_iag.videos_text')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { widgetConfig } from './widgetConfig';
