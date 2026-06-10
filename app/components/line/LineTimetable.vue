<script setup lang="ts">
const sunday = 1 << 1
const monday = 1 << 2
const tuesday = 1 << 3
const wednesday = 1 << 4
const thursday = 1 << 5
const friday = 1 << 6
const saturday = 1 << 7

const lineStore = useLineStore()
const { t } = useI18n()
const { code } = useLine()
const { routeCode } = useLineRoutes()
const { query: lineTimetableQuery } = useLineTimetable()
const { cssVariableTemplate } = useLineTheme()

const day = ref(1 << (new Date().getDay() + 1))

const timetableFiltered = computed(() => {
  if (!lineTimetableQuery.data.value)
    return []

  const times: Time[] = []
  if (day.value & sunday) {
    times.push(...lineTimetableQuery.data.value.sunday)
  }

  if (day.value & monday) {
    times.push(...lineTimetableQuery.data.value.monday)
  }

  if (day.value & tuesday) {
    times.push(...lineTimetableQuery.data.value.tuesday)
  }

  if (day.value & wednesday) {
    times.push(...lineTimetableQuery.data.value.wednesday)
  }

  if (day.value & thursday) {
    times.push(...lineTimetableQuery.data.value.thursday)
  }

  if (day.value & friday) {
    times.push(...lineTimetableQuery.data.value.friday)
  }

  if (day.value & saturday) {
    times.push(...lineTimetableQuery.data.value.saturday)
  }

  return Array.from(new Set(times))
})
const groupedByHour = computed(() => Object.entries(groupDeparturesByHour(timetableFiltered.value)))

const options = computed(() => ({
  istanbul: [
    {
      value: monday | tuesday | wednesday | thursday | friday,
      label: t('weekday'),
    },
    {
      value: saturday,
      label: t('saturday'),
    },
    {
      value: sunday,
      label: t('sunday'),
    },
  ],

  izmir: [
    {
      value: saturday,
      label: t('saturday'),
    },
    {
      value: monday,
      label: t('monday'),
    },
    {
      value: tuesday,
      label: t('tuesday'),
    },
    {
      value: wednesday,
      label: t('wednesday'),
    },
    {
      value: thursday,
      label: t('thursday'),
    },
    {
      value: friday,
      label: t('friday'),
    },
    {
      value: sunday,
      label: t('sunday'),
    },
  ],
})[lineStore.city])
</script>

<template>
  <div
    class="flex flex-col bg-default rounded-md"
    :style="cssVariableTemplate"
  >
    <div class="p-2 pb-0">
      <h1 class="font-bold select-none text-lg leading-tight">
        {{ code }}
      </h1>
      <p class="text-sm text-muted leading-tight">
        {{ routeCode }}
      </p>
    </div>

    <ol class="flex flex-wrap items-center gap-2 m-2">
      <li
        v-for="option in options"
        :key="option.value"
      >
        <UButton
          :label="option.label"
          :variant="(option.value & day) > 0 ? 'solid' : 'ghost'"
          size="lg"
          @click="day = option.value"
        />
      </li>
    </ol>

    <SkeletonTimetable v-if="lineTimetableQuery.isFetching.value" />
    <ul
      v-else
      class="overflow-y-auto"
    >
      <li
        v-for="([hour, minutes], index) in groupedByHour"
        :key="hour"
        class="flex items-stretch gap-2 p-2"
        :class="{ 'bg-muted': index % 2 === 0 }"
      >
        <div class="flex items-center justify-center w-7 max-w-7 min-h-7 grow bg-primary shrink-0 rounded-md">
          <p class="font-medium text-sm text-inverted">
            {{ hour }}
          </p>
        </div>

        <ol class="flex flex-wrap items-center gap-2 shrink text-sm">
          <li
            v-for="minute in minutes"
            :key="minute"
          >
            <p>{{ minute }}</p>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>
