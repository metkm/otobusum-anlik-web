<script setup lang="ts">
const { map } = useMap()

const { query } = useLineStops()
const { buses } = useLineBuses()
const settingsStore = useSettingsStore()

const isBusClosestToThisStop = (stopCode: number | string) => {
  if (!query.data.value || buses.value.length < 1) {
    return
  }

  return buses.value.find(bus => bus.closest_stop_code === stopCode)
}
</script>

<template>
  <UQuery
    v-slot="{ data }"
    :query="query"
  >
    <ol
      class="flex flex-col grow py-1.5 overflow-y-auto"
      :class="{ 'max-h-[calc(var(--spacing)*12*2.5+(var(--spacing)*4))]': !settingsStore.hideMap }"
    >
      <li
        v-for="(stop, index) in data"
        :key="stop.id"
        class="flex items-center gap-2"
      >
        <USheet>
          <UButton
            variant="ghost"
            class="h-12 flex max-w-full grow"
            trailing-icon="i-lucide-chevron-right"
            :square="false"
            :ui="{ trailingIcon: 'ml-auto' }"
          >
            <p class="min-w-6.5 font-medium text-muted text-center">
              {{ index + 1 }}
            </p>

            <div class="shrink-0 mx-1 outline-2 outline-offset-2 outline-(--ui-border-muted) rounded-full size-7 flex items-center justify-center">
              <UIcon
                :name="isBusClosestToThisStop(stop.code) ? 'i-lucide-bus-front' : 'i-lucide-map-pin'"
                :class="[isBusClosestToThisStop(stop.code) ? 'text-primary' : 'text-muted/25']"
                class="size-4 shrink-0"
              />
            </div>

            <p class="text-default truncate shrink text-xs">
              {{ stop.name }}
            </p>
          </UButton>

          <template #content>
            <StopInfo :code="stop.code" />
          </template>
        </USheet>

        <template v-if="isBusClosestToThisStop(stop.code)">
          <UButton
            icon="i-lucide-locate-fixed"
            variant="soft"
            @click="() => {
              map?.panTo({ lat: stop.lat, lng: stop.lng })
            }"
          />

          <USheet>
            <UButton
              icon="i-lucide-info"
              variant="soft"
              class="mr-2"
            />

            <template #content>
              <BusInfo :door-no="isBusClosestToThisStop(stop.code)!.bus_id" />
            </template>
          </USheet>
        </template>
      </li>
    </ol>
  </UQuery>
</template>
