import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { CACHE_MS_1_MONTH } from '~/constants/app'

import type { BusStopWithBuses } from '~/types/bus'

export const useStop = (stopCode: MaybeRefOrGetter<string | number>) => {
  const runtimeConfig = useRuntimeConfig()

  const query = useQuery<BusStopWithBuses>({
    queryKey: ['stop', () => toValue(stopCode)],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/stop/${toValue(stopCode)}`).json(),
    staleTime: CACHE_MS_1_MONTH,
    persister,
  })

  return {
    query,
  }
}
