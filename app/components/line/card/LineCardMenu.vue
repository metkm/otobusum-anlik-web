<script setup lang="ts">
const settingsStore = useSettingsStore()
const lineStore = useLineStore()
const themeStore = useThemeStore()

const { map } = useMap()
const { code } = useLine()
const { scheme } = useLineTheme()
const { route } = useLineRoutes()

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

const zoomToLine = () => {
  if (!route.value || !route.value.path) {
    return
  }

  const bounds = getLatLngBounds(route.value.path)
  if (bounds) {
    map.value?.fitBounds(bounds, {
      top: 50,
      bottom: 300,
      right: 50,
      left: 50,
    })
  }
}
</script>

<template>
  <div class="flex items-center gap-1">
    <UButton
      icon="i-lucide-zoom-in"
      variant="ghost"
      color="neutral"
      @click="zoomToLine"
    />

    <UButton
      :icon="isHidden ? 'i-lucide-eye-off' : 'i-lucide-eye'"
      variant="ghost"
      color="neutral"
      @click="isHidden = !isHidden"
    />

    <USheet>
      <UButton
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
      />

      <template #content>
        <ThemeProvider>
          <div class="flex flex-col gap-2 p-2">
            <LineGroups :code="toValue(code)">
              <UButton
                variant="soft"
                :label="$t('addToGroup')"
                icon="i-lucide-plus-circle"
                size="lg"
                square
                class="w-full"
                block
              />
            </LineGroups>

            <div class="flex gap-2">
              <UButton
                variant="soft"
                icon="i-lucide-palette"
                square
                size="lg"
                block
                :label="$t('refreshColors')"
                @click="themeStore.refreshTheme(toValue(code))"
              />

              <UModal>
                <UButton
                  variant="soft"
                  square
                  size="lg"
                  block
                  :label="$t('colorPicker')"
                >
                  <div class="size-4 rounded-full bg-primary" />
                  <p>{{ $t('colorPicker') }}</p>
                </UButton>

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

            <UButton
              :label="$t('deleteLine')"
              variant="soft"
              icon="i-lucide-trash"
              square
              size="lg"
              block
              color="error"
              @click="lineStore.deleteLine(toValue(code))"
            />
          </div>
        </ThemeProvider>
      </template>
    </USheet>
  </div>
</template>
