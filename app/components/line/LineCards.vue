<script setup lang="ts">
import { motion } from 'motion-v'
import { exitFade } from '~/constants/motion'

defineOptions({
  inheritAttrs: false,
})

const lineStore = useLineStore()

const container = useTemplateRef('container')

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
    <motion.ol
      v-bind="$attrs"
      ref="container"
      class="flex gap-2 w-max overflow-x-auto pointer-events-auto"
      layout
      drag="x"
      :drag-constraints="{ left: constraintLeft, right: 0, top: 0, bottom: 0 }"
      :drag-direction-lock="true"
      :drag-elastic="0.1"
      :style="{ x }"
    >
      <AnimatePresence>
        <motion.li
          v-for="code in lineStore.group?.codes"
          :key="code"
          class="shrink-0 max-w-lg h-full"
          :style="lineStyle"
          v-bind="exitFade"
          layout
        >
          <LineContext :code="code">
            <ThemeProvider>
              <LineCard class="h-full" />
            </ThemeProvider>
          </LineContext>
        </motion.li>
      </AnimatePresence>
    </motion.ol>
  </LayoutGroup>
</template>
