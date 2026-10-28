<script setup lang="ts">
import type { LineRootContext } from '~/components/line/LineContext.vue'

const props = defineProps<{ code?: string }>()

const colorMode = useColorMode()
const themeStore = useThemeStore()

const lineContext = inject<LineRootContext | undefined>('LineContext', undefined)

const scheme = computed(() => {
  const c = props.code ?? toValue(lineContext?.code)

  if (!c) {
    return
  }

  return themeStore.themes[toValue(c)]?.[colorMode.value as keyof Schemes]
})

const cssThemeVariables = computed<object | undefined>(() => {
  if (!scheme.value)
    return

  return Object.fromEntries(
    Object.entries(scheme.value)
      .map(([key, val]) => [`--${key}`, val]),
  )
})
</script>

<template>
  <div :style="{ ...cssThemeVariables }">
    <slot />
  </div>
</template>
