import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { LINE_UPDATE_INTERVAL } from '~/constants/app'
import type { BusInfo } from '~/types/bus'

export const useLineBusInfo = (doorNo: MaybeRefOrGetter<string>) => {
  const runtimeConfig = useRuntimeConfig()

  const query = useQuery<BusInfo>({
    queryKey: ['bus', () => toValue(doorNo), 'info'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/bus-info/${doorNo}`).json(),
    staleTime: LINE_UPDATE_INTERVAL,
    persister,
  })

  return {
    query,
  }
}
