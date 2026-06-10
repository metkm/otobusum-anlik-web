<script setup lang="ts">
import { motion } from 'motion-v'
import type { ArrayOrNested, DropdownMenuItem, SelectMenuItem, SelectMenuValue } from '@nuxt/ui'
import { LINE_UPDATE_INTERVAL } from '~/constants/app'
import { slideFadeFromBottom, slideFadeFromTop } from '~/constants/motion'

defineOptions({
  inheritAttrs: false,
})

const menuOpen = ref(false)
const colorPickerOpen = ref(false)

const settingsStore = useSettingsStore()
const lineStore = useLineStore()
const themeStore = useThemeStore()

const { cssVariableTemplate, scheme } = useLineTheme()
const { query: lineBusesQuery } = useLineBuses()
const { query: lineRoutesQuery, route, routeCode } = useLineRoutes()
const { query: lineStopsQuery } = useLineStops()
const { code } = useLine()
const { t } = useI18n()

const { remaining, start } = useCountdown(LINE_UPDATE_INTERVAL)

const routeItems = computed(
  () => lineRoutesQuery.data.value?.map(route => ({
    label: route.name,
    value: route.code,
  })) as SelectMenuItem[] || [],
)

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

const lineColor = computed({
  get() {
    return scheme.value?.['ui-primary']
  },
  set(newColor: string) {
    const [_h, _s, _l] = newColor.match(/\d+.?\d+/gm) ?? ['0', '0', '0']
    if (!_h || !_s || !_l)
      return

    const hsl = [parseInt(_h), parseInt(_s), parseInt(_l)] as const
    themeStore.createTheme(toValue(code), true, hsl)
  },
})

const items = computed(() => [
  {
    label: t('refreshColors'),
    icon: 'i-lucide-palette',
    onSelect: () => themeStore.refreshTheme(toValue(code)),
  },
  {
    label: t('colorPicker'),
    icon: 'i-lucide-paintbrush',
    onSelect: () => {
      colorPickerOpen.value = true
    },
  },
  {
    label: t('deleteLine'),
    icon: 'i-lucide-trash-2',
    color: 'error',
    onSelect: () => {
      // drawerOpen.value = false
      setTimeout(() => {
        lineStore.deleteLine(toValue(code))
      }, 500)
    },
  },
] as ArrayOrNested<DropdownMenuItem>)

watch(
  lineBusesQuery.dataUpdatedAt,
  () => {
    const diff = Date.now() - lineBusesQuery.dataUpdatedAt.value

    start(Math.floor((LINE_UPDATE_INTERVAL - diff) / 1000))
  },
  {
    immediate: true,
  },
)

watch(remaining, (count) => {
  if (count !== 0) return

  lineBusesQuery.refetch()
})

const isMenuItemObject = (item: SelectMenuItem): item is Exclude<SelectMenuItem, SelectMenuValue> => {
  return typeof item === 'object' && item !== null
}
</script>

<template>
  <Motion
    layout
    as-child
    :style="{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }"
  >
    <div
      class="flex flex-col bg-default w-full shadow shadow-black/25"
      :style="`${cssVariableTemplate}`"
      v-bind="$attrs"
    >
      <Motion
        layout="position"
        class="flex justify-between p-2 pl-3"
      >
        <div class="flex items-center gap-2 overflow-hidden">
          <h1 class="font-bold select-none text-lg">
            {{ code }}
          </h1>

          <AnimatePresence mode="wait">
            <Motion
              v-if="lineBusesQuery.isFetching.value"
              v-bind="slideFadeFromTop"
              as-child
            >
              <UIcon
                name="i-lucide-loader-circle"
                class="animate-spin size-4"
              />
            </Motion>
            <motion.p
              v-else-if="lineBusesQuery.isError.value"
              class="text-error font-medium text-sm truncate"
            >
              {{ lineBusesQuery.error.value?.message }}
            </motion.p>
            <motion.p
              v-else
              class="text-xs text-muted"
              v-bind="slideFadeFromBottom"
            >
              {{ $t('lineUpdateIn', { count: remaining }) }}
            </motion.p>
          </AnimatePresence>
        </div>

        <div class="flex gap-1">
          <UButton
            :icon="isHidden ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            variant="ghost"
            color="neutral"
            @click="isHidden = !isHidden"
          />

          <LineCardMenu :items="items" />

          <UModal
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
          </UModal>
        </div>
      </Motion>

      <Motion
        v-if="lineStopsQuery.data?.value && (lineStopsQuery.data.value?.length > 1)"
        layout="position"
        as-child
      >
        <UScrollArea
          v-slot="{ item: stop, index }"
          :virtualize="{
            estimateSize: 40,
            gap: 8,
          }"
          :items="lineStopsQuery.data.value"
          class="text-sm basis-28 grow space-y-2 px-2"
        >
          <LineCardStopItem
            :stop
            :index
          />

          <!-- <Motion
            layout="position"
            class="flex items-center gap-2"
          >
            <p class="w-6.5 text-center font-medium">
              {{ index + 1 }}
            </p>

            <div class="flex justify-center items-center border-2 border-muted size-8 rounded-full">
              <UIcon
                v-if="lineBusesQuery.data.value?.find(b => b.closest_stop_code === stop.code)"
                name="i-lucide-bus-front"
                class="bg-primary rounded-full size-4"
              />
            </div>

            <p class="text-xs">
              {{ stop.name }}
            </p>
          </Motion> -->
        </UScrollArea>
      </Motion>

      <ol
        v-else-if="lineStopsQuery.isFetching.value"
        class="flex flex-col gap-2 px-2"
      >
        <li
          v-for="i in 2"
          :key="i"
          class="flex items-center gap-2"
        >
          <USkeleton class="size-10" />
          <USkeleton class="h-6 w-1/2" />
        </li>
      </ol>
      <div
        v-else-if="lineStopsQuery.error.value"
        class="h-22 flex items-center justify-center"
      >
        <p class="text-muted text-sm font-medium">
          {{ lineStopsQuery.error.value.message }}
        </p>
      </div>

      <Motion
        layout="position"
        class="flex shrink gap-2 m-2"
      >
        <UButton
          icon="i-lucide-repeat"
          variant="soft"
          class="shrink"
          @click="() => {
            lineStore.changeRouteDirection(toValue(code))
          }"
        />

        <USelectMenu
          v-model="routeCode"
          v-model:open="menuOpen"
          :items="routeItems"
          variant="soft"
          value-key="value"
          :search-input="false"
          :disabled="routeItems.length <= 1"
          :portal="false"
          class="flex-1"
          :ui="{ base: 'overflow-hidden' }"
        >
          <template #item="{ item }">
            <div
              v-if="isMenuItemObject(item)"
              class="flex items-center max-w-full gap-2"
            >
              <UIcon
                name="i-lucide-bus-front"
                class="size-4 shrink-0"
              />
              <p class="w-4 text-center">
                {{ lineBusesQuery.data.value?.reduce((acc, x) => x.route_code === item.value ? acc + 1 : acc, 0) }}
              </p>

              <p class="text-center bg-primary text-inverted rounded-md w-20 p-1 shrink-0 truncate text-xs font-medium">
                {{ item.value.split('_').slice(1).join('_') }}
              </p>

              <p class="truncate">
                {{ item.label }}
              </p>
            </div>
          </template>

          <div class="flex items-center justify-center overflow-hidden *:truncate w-full max-w-full gap-2">
            <template v-if="route">
              <p>{{ route?.name.split(' - ')[0] }}</p>
              <UIcon
                name="i-lucide-arrow-right"
                class="shrink-0"
              />
              <p>{{ route?.name.split(' - ')[1] }}</p>
            </template>
            <template v-else-if="lineRoutesQuery.isFetching.value">
              <USkeleton class="h-5 w-16" />
              <UIcon
                name="i-lucide-arrow-right"
                class="shrink-0"
              />
              <USkeleton class="h-5 w-16" />
            </template>
            <div v-else-if="lineRoutesQuery.error.value">
              <p>{{ lineRoutesQuery.error.value.message }}</p>
            </div>
          </div>
        </USelectMenu>
      </Motion>
    </div>
  </Motion>
</template>
