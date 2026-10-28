<script setup lang="ts">
import type { BusStop } from '~/types/bus'

defineProps<{
  stop: BusStop
}>()

const open = ref(false)
const content = useTemplateRef('content')

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
      <ThemeProvider>
        <div class="size-3 bg-muted ring-2 ring-muted rounded-lg" />
      </ThemeProvider>
    </template>

    <LineMarkerStopOverlayView
      v-if="open"
      ref="content"
      :stop-code="stop.code"
    />
  </ScriptGoogleMapsMarker>
</template>
