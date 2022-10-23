import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const init = () => {
    i18next
        .use(HttpApi)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            supportedLngs: ['vi', 'en'],
            fallbackLng: false,
            lng: 'vi',
            debug: false,
            detection: {
                order: ['path', 'cookie', 'htmlTag'],
                caches: ['cookie']
            },
            load: 'currentOnly',
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            }
        });
};
