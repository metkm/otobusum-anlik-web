<script setup lang="ts">
import { LINE_UPDATE_INTERVAL } from '~/constants/app'
import { slideFadeFromTop, slideFadeFromBottom } from '~/constants/motion'

const { code } = useLine()
const { query } = useLineBuses()

const duration = computed(() => query.data.value ? query.data.value.next_poll * 1000 - query.dataUpdatedAt.value : LINE_UPDATE_INTERVAL)
const { remaining } = useCountdown(query.dataUpdatedAt, duration)
</script>

<template>
  <div class="flex items-center gap-2 p-2 border-b border-b-muted justify-between flex-1 overflow-hidden">
    <div class="flex items-center gap-2 min-w-0">
      <UBadge
        :label="code.toString()"
        variant="soft"
        size="lg"
      />

      <AnimatePresence mode="wait">
        <Motion
          v-if="query.isFetching.value"
          v-bind="slideFadeFromTop"
          as-child
        >
          <LoadingSpinner />
        </Motion>
        <Motion
          v-else-if="query.isError.value"
          class="text-error font-medium text-sm truncate"
        >
          {{ query.error.value?.message }}
        </Motion>
        <Motion
          v-else
          class="text-xs text-muted"
          v-bind="slideFadeFromBottom"
        >
          {{ $t('lineUpdateIn', { count: toValue(remaining) }) }}
        </Motion>
      </AnimatePresence>
    </div>

    <LineCardMenu />
  </div>
</template>
