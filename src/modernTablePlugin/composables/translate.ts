import en from '../locales/en.json'
import fr from '../locales/fr.json'

const messages = {
  en,
  fr
}

export function useTranslate(locale: keyof typeof messages = 'en') {
  function trans(key: keyof typeof en) {
    return messages[locale][key]
  }

  return {
    trans
  }
}