<script setup lang="ts">
const { map } = useMap()

const { query } = useLineStops()
const { buses } = useLineBuses()

const isBusClosestToThisStop = (stopCode: number | string) => {
  if (!query.data.value || buses.value.length < 1) {
    return false
  }

  return buses.value.some(bus => bus.closest_stop_code === stopCode)
}
</script>

<template>
  <UQuery
    v-slot="{ data }"
    :query="query"
  >
    <ol class="flex flex-col py-2 max-h-[calc(var(--spacing)*12*3+(var(--spacing)*4))] overflow-y-auto w-full">
      <li
        v-for="(stop, index) in data"
        :key="stop.id"
        class="flex items-center justify-stretch gap-2"
      >
        <USheet>
          <UButton
            variant="ghost"
            class="grow flex-1 w-full h-12"
            trailing-icon="i-lucide-chevron-right"
            :square="false"
            :ui="{ trailingIcon: 'ml-auto' }"
          >
            <p class="w-6.5 font-medium text-muted text-center">
              {{ index + 1 }}
            </p>

            <div class="mx-1 outline-2 outline-offset-2 rounded-full size-7 flex items-center justify-center">
              <UIcon
                :name="isBusClosestToThisStop(stop.code) ? 'i-lucide-bus-front' : 'i-lucide-map-pin'"
                :class="[isBusClosestToThisStop(stop.code) ? 'text-primary' : 'text-muted/25']"
                class="size-4"
              />
            </div>

            <div class="text-left">
              <p class="text-default leading-tight">
                {{ stop.name }}
              </p>
            </div>
          </UButton>

          <template #content>
            <StopInfo :code="stop.code" />
          </template>
        </USheet>

        <UButton
          v-if="isBusClosestToThisStop(stop.code)"
          icon="i-lucide-locate-fixed"
          @click="() => {
            map?.panTo({ lat: stop.lat, lng: stop.lng })
          }"
        />
      </li>
    </ol>
  </UQuery>
</template>
