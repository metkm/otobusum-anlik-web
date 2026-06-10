import { useQuery } from '@tanstack/vue-query'
import ky from 'ky'
import { CACHE_MS_1_MONTH } from '~/constants/app'

export type Time = `${number}:${number}:${number}`

interface Timetable {
  sunday: Time[]
  monday: Time[]
  tuesday: Time[]
  wednesday: Time[]
  thursday: Time[]
  friday: Time[]
  saturday: Time[]
}

export const useLineTimetable = () => {
  const runtimeConfig = useRuntimeConfig()
  const { code } = useLine()
  const { direction } = useLineRoutes()

  const query = useQuery<Timetable>({
    queryKey: ['timetable', toValue(code), toValue(direction)],
    queryFn: () => ky.get(`${runtimeConfig.public.baseUrl}/timetable/${toValue(code)}`, {
      searchParams: {
        direction: toValue(direction),
      },
    }).json(),
    staleTime: CACHE_MS_1_MONTH,
    persister,
  })

  return {
    query,
  }
}
