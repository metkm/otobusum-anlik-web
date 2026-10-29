<script setup lang="ts">
const lineStore = useLineStore()
const settingsStore = useSettingsStore()

const codes = computed(() => lineStore.group?.codes.filter(c => !settingsStore.hiddenLines.includes(c)))
</script>

<template>
  <div class="flex flex-col grow relative">
    <AppMap class="grow w-full!">
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

    <AppMapOverlay class="bottom-(--bottom-navigation-inset) pb-0!">
      <AppMapButtons />
      <LineCards />
    </AppMapOverlay>
  </div>
</template>
