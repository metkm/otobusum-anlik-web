import type { City } from '~/types/city'
import type { LineGroup, RouteCode, RouteDirection } from '~/types/line'

export interface LineStoreV4 {
  city: City
  linesByCity: Record<City, LineGroup[]>
  routesByCity: Record<City, Record<string, RouteCode>>
  groupIdsByCity: Record<City, string>
  version: 4
}

export const useLineStore = defineStore('lines', () => {
  const themeStore = useThemeStore()
  const toast = useToast()
  const { t } = useI18n()

  const city = ref<LineStoreV4['city']>('istanbul')
  const version = ref(4)

  const routesByCity = ref<LineStoreV4['routesByCity']>({
    istanbul: {},
    izmir: {},
  })

  const linesByCity = ref<LineStoreV4['linesByCity']>({
    istanbul: [{ id: 'default', name: 'default', codes: [] }],
    izmir: [{ id: 'default', name: 'default', codes: [] }],
  })

  const groupIdsByCity = ref<LineStoreV4['groupIdsByCity']>({
    istanbul: 'default',
    izmir: 'default',
  })

  const routes = computed(() => routesByCity.value[city.value])

  const groupId = computed({
    get() {
      return groupIdsByCity.value[city.value]
    },
    set(id: string) {
      groupIdsByCity.value[city.value] = id
    },
  })

  const groups = computed(() => linesByCity.value[city.value])
  const group = computed(() => groups.value.find(gr => gr.id === groupId.value))

  const addLine = (code: string, _groupId?: string) => {
    const codes = groups.value
      .find(gr => gr.id === (_groupId ?? groupId.value))
      ?.codes

    if (!codes)
      return

    if (codes.length > 3) {
      toast.add({
        title: t('lineLimitExceeded'),
      })

      return
    }

    if (codes.includes(code)) {
      toast.add({
        title: t('lineAlreadyInGroup'),
      })

      return
    }

    codes.push(code)
    themeStore.createTheme(code)
  }

  const deleteLine = (code: string, _groupId?: string) => {
    const codes = linesByCity.value[city.value]
      .find(gr => gr.id === (_groupId ?? groupId.value))
      ?.codes

    const i = codes?.findIndex(cd => cd === code)
    if (i === -1 || i === undefined)
      return

    codes?.splice(i, 1)

    for (let index = 0; index < groups.value.length; index++) {
      const group = groups.value[index]

      if (!group || group.id === groupId.value)
        continue

      if (group.codes.includes(code))
        return
    }

    themeStore.deleteTheme(code)
  }

  const createGroup = () => {
    const uuid = crypto?.randomUUID?.()
      ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

    linesByCity.value[city.value].push({
      id: uuid,
      name: uuid,
      codes: [],
    })
  }

  const deleteGroup = (id: string) => {
    if (groups.value.length < 2)
      return

    const i = groups.value.findIndex(gr => gr.id === id)
    if (i === -1 || i === undefined)
      return

    groups.value.splice(i, 1)

    if (id === groupId.value) {
      groupId.value = groups.value.at(0)!.id
    }

    themeStore.deleteUnusedThemes()
  }

  const changeRouteDirection = (code: string) => {
    const routeCode = routes.value[code] || `${code}_G_D0`

    const direction = routeCode.split('_')[1] as RouteDirection
    const otherDirectionCode = routeCode.replace(/G|D/, direction === 'G' ? 'D' : 'G') as RouteCode

    routesByCity.value[city.value][code] = otherDirectionCode
  }

  return {
    city,
    routesByCity,
    linesByCity,
    groupIdsByCity,
    routes,
    groups,
    group,
    addLine,
    deleteLine,
    createGroup,
    deleteGroup,
    groupId,
    changeRouteDirection,
    version,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
