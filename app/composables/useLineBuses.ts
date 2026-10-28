import type { Query } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'

const getRefetchAndStaleTime = (query: Query<BusLocationResponse>) => {
  const { data } = query.state
  if (!data) {
    return 0
  }

  const left = data.next_poll * 1000 - query.state.dataUpdatedAt
  return Math.max(1000, Math.ceil(left))
}

export const useLineBuses = () => {
  const runtimeConfig = useRuntimeConfig()
  const { code } = useLine()
  const { routeCode } = useLineRoutes()

  const query = useQuery<BusLocationResponse>({
    queryKey: ['line', toValue(code), 'buses'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/bus-locations/${toValue(code)}`).json(),
    refetchInterval: getRefetchAndStaleTime,
    staleTime: getRefetchAndStaleTime,
  })

  const buses = computed(() => query.data.value?.data.filter(bus => bus.route_code === routeCode.value) || [])

  return {
    query,
    buses,
  }
}
