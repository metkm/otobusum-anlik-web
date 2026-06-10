<script setup lang="ts">
import type { BusStop } from '~/types/bus'

defineProps<{
  stop: BusStop
}>()

const open = ref(false)
const content = useTemplateRef('content')

const { cssVariableTemplate } = useLineTheme()

onClickOutside(content, () => {
  open.value = false
})
</script>

<template>
  <ScriptGoogleMapsMarker
    :position="{ lat: stop.lat, lng: stop.lng }"
    @click="open = !open"
  >
    <template #content>
      <div
        class="size-3 bg-muted ring-2 ring-muted rounded-lg"
        :style="cssVariableTemplate"
      />
    </template>

    <LineMarkerStopOverlayView
      v-if="open"
      ref="content"
      :stop-code="stop.code"
    />
  </ScriptGoogleMapsMarker>
</template>
