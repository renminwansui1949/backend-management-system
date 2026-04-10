export const LANG_MAP = {
  ZH_CN: 'zh-cn',
  EN: 'en',
}

export const getCurrentLang = () => {
  const lang = localStorage.getItem('lang')
  return lang || 'zh-cn'
}

export const isEnFunction = () => {
  return getCurrentLang() === LANG_MAP.EN
}

export const onLanguageClick = () => {
  const lang = getCurrentLang()

  if (lang === LANG_MAP.ZH_CN) {
    window.localStorage.setItem('lang', LANG_MAP.EN)
  } else {
    window.localStorage.setItem('lang', LANG_MAP.ZH_CN)
  }

  window.location.reload()
}
