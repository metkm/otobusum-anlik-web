<script setup lang="ts">
const lineStore = useLineStore()
const themeStore = useThemeStore()

const { code } = useLine()
const { scheme } = useLineTheme()

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
</script>

<template>
  <USheet>
    <UButton
      icon="i-lucide-menu"
      variant="ghost"
      color="neutral"
    />

    <template #content>
      <ThemeProvider>
        <div class="flex flex-col gap-2 p-2">
          <USheet>
            <UButton
              variant="soft"
              :label="$t('addToGroup')"
              icon="i-lucide-plus-circle"
              size="lg"
              square
              class="w-full"
              block
            />

            <template #content>
              <LineGroups :code="toValue(code)" />
            </template>
          </USheet>

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
        </div>
      </ThemeProvider>
    </template>
  </USheet>
</template>
