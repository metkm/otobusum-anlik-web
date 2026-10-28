import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { LINE_UPDATE_INTERVAL } from '~/constants/app'

export const useLineBuses = () => {
  const runtimeConfig = useRuntimeConfig()
  const { code } = useLine()
  const { routeCode } = useLineRoutes()

  const query = useQuery<BusLocationResponse>({
    queryKey: ['line', toValue(code), 'buses'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/bus-locations/${toValue(code)}`).json(),
    enabled: () => false,
    refetchInterval: LINE_UPDATE_INTERVAL,
  })

  const buses = computed(() => query.data.value?.data.filter(bus => bus.route_code === routeCode.value) || [])

  return {
    query,
    buses,
  }
}
