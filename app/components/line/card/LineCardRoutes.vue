<script setup lang="ts">
const { query, routeCode, route } = useLineRoutes()
const { query: busesQuery } = useLineBuses()

const getBusCountForRoute = (_routeCode: string) => {
  return busesQuery.data.value?.data.reduce((curr, bus) => bus.route_code === _routeCode ? curr + 1 : curr, 0)
}
</script>

<template>
  <USheet>
    <UButton
      :label="route?.name ?? routeCode"
      variant="soft"
      class="flex-1"
      block
      :loading="query.isFetching.value"
    />

    <template #content>
      <UQuery
        v-slot="{ data }"
        :query="query"
      >
        <ThemeProvider class="flex flex-col max-h-full overflow-hidden">
          <ol class="p-2 overflow-y-auto max-h-full">
            <li
              v-for="r in data"
              :key="r.id"
              class="flex flex-1"
            >
              <UButton
                :label="r.name"
                :variant="routeCode === r.code ? 'soft' : 'ghost'"
                :color="routeCode === r.code ? 'primary' : 'neutral'"
                class="flex flex-col items-start grow"
                @click="routeCode = r.code"
              >
                <div class="flex items-center gap-1">
                  <UBadge
                    icon="i-lucide-bus-front"
                    :label="getBusCountForRoute(r.code)"
                  />

                  <UBadge :label="r.code" />
                </div>

                <p>{{ r.name }}</p>
              </UButton>
            </li>
          </ol>
        </ThemeProvider>
      </UQuery>
    </template>
  </USheet>
</template>
