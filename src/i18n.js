import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'
import ua from './locales/ua.json'
import fr from './locales/fr.json'
import me from './locales/me.json'
import ba from './locales/ba.json'
import sr from './locales/sr.json'

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    ua: {
      translation: ua,
    },
    fr: {
      translation: fr,
    },
    me: {
      translation: me,
    },
    ba: {
      translation: ba,
    },
    sr: {
      translation: sr,
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
