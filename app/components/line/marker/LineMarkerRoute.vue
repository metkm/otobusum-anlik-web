<script setup lang="ts">
const settingsStore = useSettingsStore()
const { query, routeCode } = useLineRoutes()
const { scheme } = useLineTheme()

const routePath = computed(() => query.data.value?.find(r => r.code === routeCode.value)?.path)
</script>

<template>
  <ScriptGoogleMapsPolyline
    :options="{
      path: routePath,
      strokeColor: scheme?.['ui-primary'],
      strokeWeight: 10,
      icons: settingsStore.initialMapZoom > 10 ? [
        {
          icon: {
            path: 'm5 12 7-7 7 7 M12 19V5',
            strokeColor: scheme?.['ui-bg-muted'],
            strokeWeight: 1.5,
            scale: 0.5,
            anchor: { x: 12, y: 0, equals: (other) => other?.x == 12 && other?.y == 0 },
          },
          repeat: '65px',
        },
      ] : undefined,
    }"
  />
</template>
