<script setup lang="ts">
import { LINE_UPDATE_INTERVAL } from '~/constants/app'
import { slideFadeFromTop, slideFadeFromBottom } from '~/constants/motion'

const { code } = useLine()
const { query } = useLineBuses()

const settingsStore = useSettingsStore()

const duration = computed(() => query.data.value ? query.data.value.next_poll * 1000 - query.dataUpdatedAt.value : LINE_UPDATE_INTERVAL)
const { remaining } = useCountdown(query.dataUpdatedAt, duration)

const isHidden = computed({
  get() {
    return settingsStore.hiddenLines.includes(toValue(code))
  },
  set(val: boolean) {
    if (val) {
      settingsStore.hiddenLines.push(toValue(code))
    }
    else {
      const i = settingsStore.hiddenLines.indexOf(toValue(code))
      settingsStore.hiddenLines.splice(i, 1)
    }
  },
})
</script>

<template>
  <div class="flex items-center gap-2 p-2.5 border-b border-b-muted justify-between flex-1 overflow-hidden">
    <div class="flex items-center gap-2">
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

    <div class="flex items-center gap-1">
      <UButton
        :icon="isHidden ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        variant="ghost"
        color="neutral"
        @click="isHidden = !isHidden"
      />

      <LineCardMenu />

      <!-- <LineCardMenu :items="items" /> -->

      <!-- <UModal
        v-model:open="colorPickerOpen"
        :title="$t('colorPicker')"
      >
        <template #body>
          <div class="flex items-center justify-evenly gap-4">
            <UColorPicker
              v-model="lineColor"
              format="hsl"
              :default-value="scheme?.['ui-primary']"
              :throttle="500"
            />

            <div class="flex flex-col items-center gap-2 text-sm">
              <div
                :style="{ backgroundColor: scheme?.['ui-primary'] }"
                class="size-14 rounded-md"
              />

              <p class="w-20 text-center">
                {{ scheme?.['ui-primary'] }}
              </p>

              <p class="text-muted text-center">
                {{ $t('colorPickerInfo') }}
              </p>
            </div>
          </div>
        </template>
      </UModal> -->
    </div>
  </div>
</template>
