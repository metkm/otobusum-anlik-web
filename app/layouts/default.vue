<script setup lang="ts">
const settingsStore = useSettingsStore()
const lineStore = useLineStore()
const router = useRouter()

const codes = computed(() => lineStore.group?.codes.filter(c => !settingsStore.hiddenLines.includes(c)))

const open = ref(router.currentRoute.value.name !== 'index')

watch(open, () => {
  if (!open.value) {
    navigateTo('/')
  }
})

watch(() => router.currentRoute.value.name, (name) => {
  if (name === 'index')
    return
  open.value = true
})
</script>

<template>
  <div class="flex-1 flex flex-col max-w-full">
    <div class="flex-1 flex relative min-h-0">
      <AppMapRoot>
        <AppMap
          ref="map"
          class="flex-1 transition-opacity"
          :class="{ 'opacity-5': settingsStore.hideMap }"
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

        <AppMapOverlay class="gap-2">
          <AppDock />
          <LineCards
            class="mt-auto"
            :class="{ grow: settingsStore.hideMap }"
          />
        </AppMapOverlay>
      </AppMapRoot>
    </div>

    <UModal
      v-if="router.currentRoute.value.name !== 'index'"
      v-model:open="open"
      :title="router.currentRoute.value.meta.label ? $t(router.currentRoute.value.meta.label as string) : undefined"
    >
      <template #body>
        <slot />
      </template>
    </UModal>
  </div>
</template>
