<script setup lang="ts">
const lineStore = useLineStore()
const settingsStore = useSettingsStore()

const codes = computed(() => lineStore.group?.codes.filter(c => !settingsStore.hiddenLines.includes(c)))
</script>

<template>
  <div class="flex flex-col grow h-full w-full overflow-hidden">
    <AppMap
      v-if="!settingsStore.hideMap"
      class="grow w-full! h-full!"
    >
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

    <LayoutGroup>
      <AppMapOverlay
        class="bottom-(--navigation-inset) lg:bottom-0 lg:top-(--navigation-inset)"
        :class="{ grow: settingsStore.hideMap }"
      >
        <AppMapButtons />
        <LineCards />
      </AppMapOverlay>
    </LayoutGroup>
  </div>
</template>
