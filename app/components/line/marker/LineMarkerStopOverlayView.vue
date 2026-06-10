<script setup lang="ts">
import { motion } from 'motion-v'

const props = defineProps<{
  stopCode: number
}>()

const { query: stopQuery } = useStop(props.stopCode)
</script>

<template>
  <ScriptGoogleMapsOverlayView :offset="{ x: 0, y: -18 }">
    <motion.div
      ref="content"
      layout
      class="flex flex-col gap-2 bg-default ring ring-default rounded-md p-2 shadow shadow-black text-sm overflow-hidden"
    >
      <template v-if="stopQuery.isFetching.value">
        <SkeletonLineMarkerStopOverlayView />
      </template>
      <template v-else>
        <motion.div layout="position">
          <p class="text-muted">
            {{ stopQuery.data.value?.stop.code }}
          </p>

          <p class="text-base font-medium">
            {{ stopQuery.data.value?.stop.name }}
          </p>

          <p class="text-muted">
            {{ stopQuery.data.value?.stop.province }}
          </p>
        </motion.div>

        <motion.div layout="position">
          <p>{{ $t('linesThatUseStop') }}</p>

          <ul class="flex flex-wrap items-center gap-2 mt-1 max-w-lg">
            <li
              v-for="bus in stopQuery.data.value?.buses"
              :key="bus"
              class="bg-muted px-2 py-1 rounded-md"
            >
              <p>{{ bus }}</p>
            </li>
          </ul>
        </motion.div>
      </template>
    </motion.div>
  </ScriptGoogleMapsOverlayView>
</template>
