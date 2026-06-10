import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { CACHE_MS_1_MONTH } from '~/constants/app'
import type { BusStop } from '~/types/bus'

export const useLineStops = () => {
  const runtimeConfig = useRuntimeConfig()
  const { code } = useLine()
  const { direction } = useLineRoutes()

  const query = useQuery<BusStop[]>({
    queryKey: ['line', toValue(code), 'stops'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/route-stops/${toValue(code)}`, {
      searchParams: {
        direction: toValue(direction),
      },
    }).json(),
    staleTime: CACHE_MS_1_MONTH,
    persister,
  })

  return { query }
}
