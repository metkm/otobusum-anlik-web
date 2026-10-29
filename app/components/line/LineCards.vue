<script setup lang="ts">
import { exitFade } from '~/constants/motion'

defineOptions({
  inheritAttrs: false,
})

const lineStore = useLineStore()

const container = useTemplateRef<HTMLElement>('container')

const { width: windowWidth } = useWindowSize()
const { width: containerWidth } = useElementSize(container)

const x = useMotionValue(0)

const constraintLeft = computed(() => {
  const pad = (lineStore.group?.codes.length ?? 0) > 1 ? 8 * 2 : 0
  const l = containerWidth.value - windowWidth.value + pad

  return -Math.max(0, l)
})

watch(constraintLeft, (l) => {
  if (x.get() < l) {
    x.set(l)
  }
})

const lineStyle = computed(() => ({
  width: `calc((${windowWidth.value}px - var(--spacing) * 2) - var(--spacing) * 2)`,
}))
</script>

<template>
  <LayoutGroup>
    <Motion
      v-bind="$attrs"
      ref="container"
      class="flex items-stretch gap-2 w-max overflow-x-auto pointer-events-auto"
      layout
      drag="x"
      :drag-constraints="{ left: constraintLeft, right: 0, top: 0, bottom: 0 }"
      :drag-direction-lock="true"
      :drag-elastic="0.1"
      :style="{ x }"
      as="ol"
    >
      <AnimatePresence>
        <Motion
          v-for="code in lineStore.group?.codes"
          :key="code"
          class="flex grow shrink-0 max-w-lg overflow-hidden"
          :style="lineStyle"
          v-bind="exitFade"
          layout
          as="li"
        >
          <LineContext :code="code">
            <ThemeProvider class="flex grow max-w-full">
              <LineCard class="grow" />
            </ThemeProvider>
          </LineContext>
        </Motion>
      </AnimatePresence>
    </Motion>
  </LayoutGroup>
</template>
