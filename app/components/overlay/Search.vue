<script setup lang="ts">
defineShortcuts({
  '/': () => open.value = true,
  'arrowdown': {
    handler: () => activeIndex.value = Math.min(items.value.length - 1, activeIndex.value + 1),
    usingInput: true,
  },
  'arrowup': {
    handler: () => activeIndex.value = Math.max(0, activeIndex.value - 1),
    usingInput: true,
  },
})

const search = ref('')
const open = ref(false)
const activeIndex = ref(0)

const { query } = useSearch(search)
const lineStore = useLineStore()

const items = computed(
  () => (query.data.value && [...query.data.value.lines, ...query.data.value.stops]) ?? [],
)

const addToGroup = (item: typeof items.value[number]) => {
  if (isStop(item)) {
    return
  }

  lineStore.addLine(item.code)
  open.value = false
}

const onSubmit = () => {
  const codeFromActiveIndex = items.value.at(activeIndex.value)
  if (!codeFromActiveIndex) {
    return
  }

  addToGroup(codeFromActiveIndex)
}
</script>

<template>
  <USheet v-model:open="open">
    <UButton
      icon="i-lucide-search"
      color="neutral"
      variant="subtle"
      size="lg"
    />

    <template #content>
      <UForm @submit="onSubmit">
        <Motion
          layout="position"
          class="mx-2 mt-2"
        >
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="KM-12"
            class="flex-1 w-full"
            autofocus
            :loading="query.isFetching.value"
          />
        </Motion>
      </UForm>

      <AnimatePresence mode="popLayout">
        <div
          v-if="items.length > 0"
          key="items"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          as="ol"
          class="flex flex-col max-h-full overflow-y-auto p-2"
        >
          <Motion
            v-for="(item, index) in items"
            :key="item.id"
            class="flex-1"
            layout="position"
            as="li"
          >
            <ThemeProvider :code="toValue(item.code.toString())">
              <UButton
                :variant="index === activeIndex ? 'soft' : 'ghost'"
                color="neutral"
                class="w-full text-left truncate"
                square
                size="lg"
                @click="addToGroup(item)"
              >
                <UBadge
                  :icon="isStop(item) ? 'i-lucide-map-pin' : 'i-lucide-bus-front'"
                  :label="item.code"
                />

                <p>{{ item.name }}</p>
              </UButton>
            </ThemeProvider>
          </Motion>
        </div>
      </AnimatePresence>
    </template>
  </USheet>
</template>
