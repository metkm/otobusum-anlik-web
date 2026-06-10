import { useQuery } from '@tanstack/vue-query'
import type { BusStop, BusLine } from '~/types/bus'
import ky from 'ky'

export interface SearchResponse {
  stops: BusStop[]
  lines: BusLine[]
}

export const SEARCH_KEY_LIMIT = 1

export const isStop = (item: BusStop | BusLine): item is BusStop => {
  return (item as BusStop).lng !== undefined
}

export const useSearch = (q: MaybeRef<string>) => {
  const runtimeConfig = useRuntimeConfig()
  const lineStore = useLineStore()

  const query = useQuery({
    queryKey: ['search', () => toValue(q)],
    queryFn: () => ky.get<SearchResponse>(`${runtimeConfig.public.baseUrl}/v1/search`, {
      searchParams: {
        q: toValue(q),
        city: toValue(lineStore.city),
      },
    }).json(),
    enabled: () => toValue(q).length > SEARCH_KEY_LIMIT,
  })

  return { query }
}
