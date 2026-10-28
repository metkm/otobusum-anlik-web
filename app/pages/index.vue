<script setup lang="ts">
const lineStore = useLineStore()
const settingsStore = useSettingsStore()

const codes = computed(() => lineStore.group?.codes.filter(c => !settingsStore.hiddenLines.includes(c)))
</script>

<template>
  <AppMap class="flex-1">
    <LineContext
      v-for="code in codes"
      :key="code"
      :code="code"
    >
      <LineMarkerBuses />
      <LineMarkerRoute />

      <LineMarkerStops v-if="settingsStore.initialMapZoom > 13" />
    </LineContext>
  </AppMap>
</template>
