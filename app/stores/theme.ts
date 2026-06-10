import { hexFromArgb } from '@material/material-color-utilities'
import type { City } from '~/types/city'

interface Scheme {
  'ui-primary': string
  'ui-bg': string
  'ui-bg-muted': string
  'ui-bg-elevated': string
  'ui-text': string
  'ui-text-inverted': string
  'ui-border': string
  'ui-border-muted': string
}

export interface Schemes {
  dark: Scheme
  light: Scheme
}

export interface ThemeStoreV4 {
  themesByCity: Record<City, Record<string, Schemes>>
  version: 4
}

export const getRandomLineTheme = (hslColor?: readonly [number, number, number]) => {
  const { schemes, palettes } = createRandomTheme(hslColor)

  return {
    dark: {
      'ui-primary': hexFromArgb(schemes.dark.primary),
      'ui-bg': hexFromArgb(schemes.dark.surface),
      'ui-bg-muted': hexFromArgb(palettes.neutral.tone(12)),
      'ui-bg-elevated': hexFromArgb(palettes.neutral.tone(17)),
      'ui-text': hexFromArgb(schemes.dark.onSurface),
      'ui-text-inverted': hexFromArgb(schemes.dark.inverseOnSurface),
      'ui-border': hexFromArgb(schemes.dark.outline),
      'ui-border-muted': hexFromArgb(schemes.dark.outlineVariant),
    },
    light: {
      'ui-primary': hexFromArgb(schemes.light.primary),
      'ui-bg': hexFromArgb(schemes.light.surface),
      'ui-bg-muted': hexFromArgb(palettes.neutral.tone(94)),
      'ui-bg-elevated': hexFromArgb(palettes.neutral.tone(92)),
      'ui-text': hexFromArgb(schemes.light.onSurface),
      'ui-text-inverted': hexFromArgb(schemes.light.inverseOnSurface),
      'ui-border': hexFromArgb(schemes.light.outline),
      'ui-border-muted': hexFromArgb(schemes.light.outlineVariant),
    },
  }
}

export const useThemeStore = defineStore('themes', () => {
  const lineStore = useLineStore()

  const version = ref(4)

  const themesByCity = ref<ThemeStoreV4['themesByCity']>({
    istanbul: {},
    izmir: {},
  })

  const themes = computed(() => themesByCity.value[lineStore.city])

  const createTheme = (code: string, overwrite?: boolean, hslColor?: readonly [number, number, number]) => {
    if (themes.value[code] && !overwrite)
      return

    themesByCity.value[lineStore.city][code] = getRandomLineTheme(hslColor)
  }

  const refreshTheme = (code: string) => createTheme(code, true)

  const deleteTheme = (code: string) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete themesByCity.value[lineStore.city][code]
  }

  const deleteUnusedThemes = () => {
    const allCodes = lineStore.linesByCity[lineStore.city].flatMap(gr => gr.codes)
    const themeCodes = Object.keys(themes.value)

    for (let index = 0; index < themeCodes.length; index++) {
      const code = themeCodes[index]
      if (!code || allCodes.includes(code))
        continue

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete themesByCity.value[lineStore.city][code]
    }
  }

  return {
    createTheme,
    themes,
    themesByCity,
    refreshTheme,
    deleteTheme,
    deleteUnusedThemes,
    version,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
