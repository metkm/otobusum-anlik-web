import type { City } from '~/types/city'
import type { LineStoreV4 } from '~/stores/line'

interface LineStoreV3 {
  state: {
    lines: Record<City, string[]>
    lineGroups: Record<City, Record<string, { id: string, lineCodes: string[], title: string }>>
  }
  version: 3
}

type LineStore = LineStoreV3 | LineStoreV4

type CurrentLineStore = LineStoreV4
type CurrentThemeStore = ThemeStoreV4

const parse = (data: string): LineStore => {
  return JSON.parse(data) as LineStore
}

export default defineNuxtPlugin(() => {
  const raw = localStorage.getItem('line-storage')
  if (!raw)
    return

  const parsed = parse(raw)

  if (parsed.version === 3) {
    const newLineStore: Partial<CurrentLineStore> = {
      linesByCity: {
        istanbul: [],
        izmir: [],
      },
    }

    const newThemeStore: Partial<CurrentThemeStore> = {
      themesByCity: {
        istanbul: {},
        izmir: {},
      },
    }

    for (const [city, value] of Object.entries(parsed.state.lines)) {
      newLineStore.linesByCity?.[city as City].push({ id: 'default', name: 'default', codes: value })

      for (const code of value) {
        newThemeStore.themesByCity![city as City][code] = getRandomLineTheme()
      }
    }

    for (const [city, groups] of Object.entries(parsed.state.lineGroups)) {
      for (const [id, value] of Object.entries(groups)) {
        newLineStore.linesByCity?.[city as City].push({ id, name: value.title, codes: value.lineCodes })
      }
    }

    localStorage.setItem('lines', JSON.stringify(newLineStore))
    localStorage.setItem('themes', JSON.stringify(newThemeStore))

    localStorage.removeItem('line-storage')
    localStorage.removeItem('settings-storage')
    localStorage.removeItem('filter-storage')
  }
})
