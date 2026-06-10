import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { CACHE_MS_1_MONTH } from '~/constants/app'

export type Direction = 'G' | 'D'
export type RouteCode = `${string}_${Direction}_${string}`

export interface LineRoute {
  id: number
  agency_id: string
  line_code: string
  name: string
  type: string
  desc: string
  code: RouteCode
  path?: { lat: number, lng: number }[]
}

export const useLineRoutes = () => {
  const runtimeConfig = useRuntimeConfig()
  const lineStore = useLineStore()
  const { code } = useLine()

  const query = useQuery<LineRoute[]>({
    queryKey: ['line', toValue(code), 'routes'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/routes/${toValue(code)}`).json(),
    staleTime: CACHE_MS_1_MONTH,
    persister,
  })

  const routeCode = computed({
    get() {
      return lineStore.routes[toValue(code)] || `${toValue(code)}_G_D0`
    },
    set(routeCode: RouteCode) {
      lineStore.routes[toValue(code)] = routeCode
    },
  })

  const route = computed(() => query.data.value?.find(r => r.code === routeCode.value))
  const direction = computed(() => (routeCode.value.split('_')[1] || 'G') as RouteCode)

  return { query, routeCode, route, direction }
}
