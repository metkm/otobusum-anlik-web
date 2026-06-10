<script setup lang="ts">
import { injectMapRootContext } from './AppMapRoot.vue'
import type { ScriptGoogleMapsExpose } from '#nuxt-scripts/components/GoogleMaps/ScriptGoogleMaps.vue'

const colorMode = useColorMode()
const settingsStore = useSettingsStore()

const mapRef = useTemplateRef('mapRef')
const mapRootContext = injectMapRootContext()

const trafficLayer = shallowRef<google.maps.TrafficLayer>()
const apiKey = import.meta.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_MAPS_API_KEY

const debouncedMapCenterChange = useDebounceFn(() => {
  const map = mapRootContext.map.value
  if (!map)
    return

  const center = map.getCenter()
  const zoom = map.getZoom()

  if (center) {
    settingsStore.initialMapCenter = center.toJSON()
  }

  if (zoom) {
    settingsStore.initialMapZoom = zoom
  }
}, 250)

const handleReady = ({ map, mapsApi }: ScriptGoogleMapsExpose) => {
  if (mapsApi.value) {
    trafficLayer.value = new mapsApi.value.TrafficLayer()
  }

  if (map.value) {
    mapRootContext.map.value = map.value
    map.value.addListener('center_changed', debouncedMapCenterChange)

    if (trafficLayer.value && settingsStore.showTraffic) {
      trafficLayer.value.setMap(map.value)
    }
  }
}

watch(() => settingsStore.showTraffic, (showTraffic) => {
  if (!mapRootContext.map.value)
    return

  trafficLayer.value?.setMap(showTraffic ? mapRootContext.map.value : null)
})

defineExpose({ mapRef })
</script>

<template>
  <ScriptGoogleMaps
    ref="mapRef"
    :key="colorMode.value"
    :map-options="{
      colorScheme: colorMode.value.toUpperCase(),
      center: settingsStore.initialMapCenter,
      zoom: settingsStore.initialMapZoom,
      disableDefaultUI: true,
    }"
    :api-key="apiKey"
    trigger="immediate"
    @ready="handleReady"
  >
    <slot />
  </ScriptGoogleMaps>
</template>

<style>
.gm-style-cc {
  display: none;
}
</style>
