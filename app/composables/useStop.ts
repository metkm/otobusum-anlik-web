import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { CACHE_MS_1_MONTH } from '~/constants/app'

import type { BusStopWithBuses } from '~/types/bus'

export const useStop = (stopCode: string | number) => {
  const runtimeConfig = useRuntimeConfig()

  const query = useQuery<BusStopWithBuses>({
    queryKey: ['stop', stopCode],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/v1/stop/${stopCode}`).json(),
    staleTime: CACHE_MS_1_MONTH,
    persister,
  })

  return {
    query,
  }
}
