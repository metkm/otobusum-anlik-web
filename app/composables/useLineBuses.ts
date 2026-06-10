import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { LINE_UPDATE_INTERVAL } from '~/constants/app'

interface BusLocation {
  bus_id: string
  lng: number
  lat: number
  route_code: string
  closest_stop_code: number
}

export const useLineBuses = () => {
  const runtimeConfig = useRuntimeConfig()
  const { code } = useLine()

  const query = useQuery<BusLocation[]>({
    queryKey: ['line', toValue(code), 'buses'],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/bus-locations/${toValue(code)}`).json(),
    refetchInterval: LINE_UPDATE_INTERVAL,
  })

  return { query }
}
