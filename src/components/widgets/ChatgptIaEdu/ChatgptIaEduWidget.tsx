import { LinkPortalWidget } from '../shared/LinkPortalWidget';

const COMMUNITY_URL = 'https://chatgpt-ia-edu.github.io/';

export const ChatgptIaEduWidget = () => (
    <LinkPortalWidget
        titleKey="widgets.chatgpt_ia_edu.title"
        descriptionKey="widgets.chatgpt_ia_edu.description"
        url={COMMUNITY_URL}
        openLabelKey="widgets.chatgpt_ia_edu.open_new_tab"
    />
);

export { widgetConfig } from './widgetConfig';
