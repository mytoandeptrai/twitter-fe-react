import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from '@/locales/en/translation.json'
import translationVI from '@/locales/vi/translation.json'
const fallbackLng = 'en'

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
}

i18n
  .use(Backend)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng,
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })
export default i18n
