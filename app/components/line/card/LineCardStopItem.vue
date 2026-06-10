<script setup lang="ts">
import type { BusStop } from '~/types/bus'

const props = defineProps<{
  stop: BusStop
  index: number
}>()

const { query: lineBusesQuery } = useLineBuses()
const { map } = useMap()

const closestBus = computed(() => lineBusesQuery.data.value?.find(b => b.closest_stop_code === props.stop.code))

const locateBus = () => {
  if (!closestBus.value)
    return

  map.value?.panTo({ lng: closestBus.value.lng, lat: closestBus.value.lat })
}
</script>

<template>
  <Motion
    layout="position"
    class="flex items-center gap-2 justify-between"
  >
    <div class="flex items-center gap-2">
      <p class="w-6.5 text-center font-medium">
        {{ index + 1 }}
      </p>

      <div class="flex justify-center items-center border-2 border-muted size-8 rounded-full">
        <UIcon
          v-if="closestBus"
          name="i-lucide-bus-front"
          class="bg-primary rounded-full size-4"
        />
      </div>

      <p class="text-xs">
        {{ stop.name }}
      </p>
    </div>

    <div
      v-if="closestBus"
      class="flex gap-2"
    >
      <UButton
        icon="i-lucide-locate"
        variant="soft"
        @click="locateBus"
      />

      <UButton
        icon="i-lucide-info"
        variant="soft"
        :to="{
          path: `/sheet/bus-info/${closestBus.bus_id}`,
        }"
      />
    </div>
  </Motion>
</template>
