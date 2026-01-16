import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './WikipediaSearchWidget.css';

type WikiResult = {
    title: string;
    snippet: string;
    url: string;
    pageid: number;
};

type LanguageOption = {
    code: string;
    label: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'eu', label: 'Euskara' },
    { code: 'gl', label: 'Galego' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
];

const TEXT_SCALE_OPTIONS = [
    { value: 0.9, labelKey: 'widgets.wikipedia.text_size_small' },
    { value: 1, labelKey: 'widgets.wikipedia.text_size_normal' },
    { value: 1.2, labelKey: 'widgets.wikipedia.text_size_large' },
    { value: 1.4, labelKey: 'widgets.wikipedia.text_size_xlarge' },
    { value: 1.6, labelKey: 'widgets.wikipedia.text_size_xxlarge' },
];

const getLanguageOption = (code: string) => (
    LANGUAGE_OPTIONS.find((option) => option.code === code) ?? LANGUAGE_OPTIONS[0]
);

export const WikipediaSearchWidget = () => {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<WikiResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const [activeResult, setActiveResult] = useState<WikiResult | null>(null);
    const [iframeBlocked, setIframeBlocked] = useState(false);
    const [selectedLang, setSelectedLang] = useState<LanguageOption>(() => getLanguageOption(i18n.language));
    const [lockLanguageToWidget, setLockLanguageToWidget] = useState(false);
    const [textScale, setTextScale] = useState(1);

    useEffect(() => {
        if (!lockLanguageToWidget) {
            setSelectedLang(getLanguageOption(i18n.language));
        }
    }, [i18n.language, lockLanguageToWidget]);

    const performSearch = async (term: string, lang: string) => {
        const trimmed = term.trim();
        if (!trimmed) {
            setResults([]);
            setHasError(false);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setHasError(false);
        try {
            const response = await fetch(
                `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(trimmed)}&format=json&origin=*&utf8=1&srlimit=10`
            );
            if (!response.ok) throw new Error('wiki fetch failed');
            const data = await response.json();
            const items = (data?.query?.search || []) as Array<{ title: string; snippet: string; pageid: number }>;
            const cleaned = items.map((item) => ({
                title: item.title,
                snippet: (item.snippet || '').replace(/<[^>]*>/g, ''),
                url: `https://${lang}.wikipedia.org/?curid=${item.pageid}`,
                pageid: item.pageid,
            }));
            setResults(cleaned);
        } catch {
            setHasError(true);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (lastQuery) {
            performSearch(lastQuery, selectedLang.code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLang.code]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLastQuery(query.trim());
        setActiveResult(null);
        setIframeBlocked(false);
        performSearch(query, selectedLang.code);
    };

    const resultsLabel = useMemo(
        () => t('widgets.wikipedia.results_title', { lang: selectedLang.label }),
        [selectedLang.label, t]
    );

    return (
        <section className="wiki-widget" style={{ '--wiki-text-scale': textScale } as React.CSSProperties}>
            <header className="wiki-header">
                <div>
                    <div className="wiki-title">{t('widgets.wikipedia.title')}</div>
                    <div className="wiki-subtitle">{t('widgets.wikipedia.subtitle')}</div>
                </div>
                <form className="wiki-search" onSubmit={handleSubmit}>
                    <label className="wiki-label" htmlFor="wiki-query">{t('widgets.wikipedia.search_label')}</label>
                    <div className="wiki-input-row">
                        <div className="wiki-input-wrap">
                            <Search size={18} />
                            <input
                                id="wiki-query"
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={t('widgets.wikipedia.search_placeholder')}
                            />
                        </div>
                        <select
                            className="wiki-select"
                            value={selectedLang.code}
                            onChange={(event) => {
                                setSelectedLang(getLanguageOption(event.target.value));
                                setLockLanguageToWidget(true);
                            }}
                            aria-label={t('widgets.wikipedia.language_label')}
                        >
                            {LANGUAGE_OPTIONS.map((option) => (
                                <option key={option.code} value={option.code}>{option.label}</option>
                            ))}
                        </select>
                        <button className="wiki-button" type="submit" disabled={!query.trim()}>
                            {t('widgets.wikipedia.search_button')}
                        </button>
                    </div>
                    <div className="wiki-hint">{t('widgets.wikipedia.search_hint')}</div>
                </form>
            </header>

            <div className="wiki-results">
                <div className="wiki-results-header">
                    <div>
                        <h3>{resultsLabel}</h3>
                        {lastQuery && <span>{t('widgets.wikipedia.results_for', { query: lastQuery })}</span>}
                    </div>
                    <div className="wiki-results-controls">
                        <select
                            className="wiki-scale-select"
                            value={textScale}
                            onChange={(event) => setTextScale(Number(event.target.value))}
                            aria-label={t('widgets.wikipedia.text_size_label')}
                        >
                            {TEXT_SCALE_OPTIONS.map((option) => (
                                <option key={option.labelKey} value={option.value}>
                                    {t(option.labelKey)}
                                </option>
                            ))}
                        </select>
                        {activeResult && (
                            <button
                                type="button"
                                className="wiki-back-button"
                                onClick={() => {
                                    setActiveResult(null);
                                    setIframeBlocked(false);
                                }}
                            >
                                {t('widgets.wikipedia.back_to_results')}
                            </button>
                        )}
                    </div>
                </div>
                {activeResult ? (
                    <div className="wiki-article">
                        <div className="wiki-article-header">
                            <h4>{activeResult.title}</h4>
                            <button
                                type="button"
                                className="wiki-summary-button"
                                onClick={() => window.open(activeResult.url, '_blank', 'noopener,noreferrer')}
                            >
                                <ExternalLink size={16} />
                                {t('widgets.wikipedia.open_new_tab')}
                            </button>
                        </div>
                        <div className="wiki-article-body">
                            {iframeBlocked && (
                                <div className="wiki-empty">
                                    {t('widgets.wikipedia.article_blocked')}
                                </div>
                            )}
                            {!iframeBlocked && (
                                <iframe
                                    key={activeResult.url}
                                    src={activeResult.url}
                                    title={activeResult.title}
                                    className="wiki-iframe"
                                    loading="lazy"
                                    onLoad={() => setIframeBlocked(false)}
                                    onError={() => setIframeBlocked(true)}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {isLoading && <div className="wiki-empty">{t('widgets.wikipedia.loading')}</div>}
                        {!isLoading && hasError && <div className="wiki-empty">{t('widgets.wikipedia.load_error')}</div>}
                        {!isLoading && !hasError && lastQuery && results.length === 0 && (
                            <div className="wiki-empty">{t('widgets.wikipedia.no_results')}</div>
                        )}
                        {!isLoading && !hasError && results.length > 0 && (
                            <ul className="wiki-list">
                                {results.map((result) => (
                                    <li
                                        key={result.url}
                                        className="wiki-card"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => {
                                            setActiveResult(result);
                                            setIframeBlocked(false);
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                setActiveResult(result);
                                                setIframeBlocked(false);
                                            }
                                        }}
                                    >
                                        <div>
                                            <h4>{result.title}</h4>
                                            <p>{result.snippet}</p>
                                        </div>
                                        <div className="wiki-card-actions">
                                            <a
                                                className="wiki-link-icon"
                                                href={result.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(event) => event.stopPropagation()}
                                                onMouseDown={(event) => event.stopPropagation()}
                                                onKeyDown={(event) => event.stopPropagation()}
                                                aria-label={t('widgets.wikipedia.open_article')}
                                                title={t('widgets.wikipedia.open_article')}
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!lastQuery && !isLoading && (
                            <div className="wiki-empty">{t('widgets.wikipedia.empty_state')}</div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export { widgetConfig } from './widgetConfig';
