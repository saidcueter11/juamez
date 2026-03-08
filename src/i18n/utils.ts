import { ui, type Lang, type Translation } from './ui';

export const languages: Record<Lang, string> = {
	es: 'Español',
	en: 'English',
};

export const defaultLang: Lang = 'es';

export function useTranslations(lang: Lang): Translation {
	return ui[lang] ?? ui[defaultLang];
}

export function localizePath(lang: Lang, pathname = '/') {
	const safePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
	const withoutEnglishPrefix = safePath.replace(/^\/en(?=\/|$)/, '') || '/';
	const normalized = withoutEnglishPrefix === '' ? '/' : withoutEnglishPrefix;

	if (lang === 'es') {
		return normalized;
	}

	return normalized === '/' ? '/en/' : `/en${normalized}`;
}

export function sectionPath(lang: Lang, section: string) {
	const rootPath = localizePath(lang, '/');
	return `${rootPath}#${section}`;
}

export function alternateLang(lang: Lang): Lang {
	return lang === 'es' ? 'en' : 'es';
}

export type { Lang };
