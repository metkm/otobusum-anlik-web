<script setup lang="ts">
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
</script>

<template>
  <UCarousel
    v-if="lineStore.group?.codes"
    v-slot="{ item }"
    :items="lineStore.group.codes"
    class="pointer-events-auto"
    :ui="{ item: `max-w-lg ps-2 ${lineStore.group.codes.length > 1 ? 'basis-[96%]' : 'basis-full'}`, container: '-ms-2', viewport: '-mx-2 px-2' }"
    :active="lineStore.group.codes.length > 1"
  >
    <LineContext :code="item">
      <ThemeProvider>
        <LineCard />
      </ThemeProvider>
    </LineContext>
  </UCarousel>
</template>
