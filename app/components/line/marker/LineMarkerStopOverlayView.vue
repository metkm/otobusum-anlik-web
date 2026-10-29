<script setup lang="ts">
const props = defineProps<{
  stopCode: number
}>()

const { query } = useStop(() => props.stopCode)
</script>

<template>
  <ScriptGoogleMapsOverlayView :offset="{ x: 0, y: -18 }">
    <div class="flex flex-col gap-2 bg-default ring ring-default rounded-md p-2 shadow shadow-black text-sm overflow-hidden">
      <UQuery :query="query">
        <template #fetching>
          <SkeletonLineMarkerStopOverlayView />
        </template>

        <template #default="{ data }">
          <Motion layout="position">
            <p class="text-muted">
              {{ data.stop.code }}
            </p>

            <p class="text-base font-medium">
              {{ data.stop.name }}
            </p>

            <p class="text-muted">
              {{ data.stop.province }}
            </p>
          </Motion>

          <Motion
            v-if="data.buses.length > 0"
            layout="position"
          >
            <p>{{ $t('linesThatUseStop') }}</p>

            <ul class="flex flex-wrap items-center gap-2 mt-1 max-w-lg">
              <li
                v-for="bus in data.buses"
                :key="bus"
                class="bg-muted px-2 py-1 rounded-md"
              >
                <p>{{ bus }}</p>
              </li>
            </ul>
          </Motion>
        </template>
      </UQuery>
    </div>
  </ScriptGoogleMapsOverlayView>
</template>
