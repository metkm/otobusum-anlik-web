<script setup lang="ts">
const { query } = useLineBuses()
const { routeCode } = useLineRoutes()

const busesFiltered = computed(
  () => (query.data.value?.data || [])
    .filter(b => b.route_code == routeCode.value),
)
</script>

<template>
  <LineMarkerBus
    v-for="bus in busesFiltered"
    :key="bus.bus_id"
    :bus="bus"
  />

  <!-- <USheet
    v-for="bus in busesFiltered"
    :key="bus.bus_id"
  >
    <div>
      <ScriptGoogleMapsMarker
        :position="{ lng: bus.lng, lat: bus.lat }"
        :options="{
          anchorTop: '-50%',
        }"
      >
        <template #content>
          <ThemeProvider>
            <div class="flex size-8 bg-primary rounded-full p-2 ring-2 ring-muted">
              <UIcon
                name="i-lucide-bus-front"
                class="h-full w-full shrink-0 text-inverted"
              />
            </div>
          </ThemeProvider>
        </template>
      </ScriptGoogleMapsMarker>
    </div>

    <template #content>
      <BusInfo :door-no="bus.bus_id" />
    </template>
  </USheet> -->

  <!-- <ScriptGoogleMapsMarker
    v-for="bus in busesFiltered"
    :key="bus.bus_id"
    :position="{ lng: bus.lng, lat: bus.lat }"
    :options="{
      anchorTop: '-50%',
    }"
    @click="() => {
      navigateTo(`/sheet/bus-info/${bus.bus_id}`)
    }"
  >
    <template #content>
      <ThemeProvider>
        <div class="flex size-8 bg-primary rounded-full p-2 ring-2 ring-muted">
          <UIcon
            name="i-lucide-bus-front"
            class="h-full w-full shrink-0 text-inverted"
          />
        </div>
      </ThemeProvider>
    </template>
  </ScriptGoogleMapsMarker> -->
</template>
