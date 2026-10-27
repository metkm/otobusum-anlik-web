<script setup lang="ts">
defineShortcuts({
  '/': () => open.value = true,
})

const search = ref('')
const open = ref(false)

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

      <AnimatePresence mode="popLayout">
        <Motion
          v-if="items.length > 0"
          key="items"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          as="ol"
          class="flex flex-col max-h-full overflow-y-auto p-2"
        >
          <Motion
            v-for="item in items"
            :key="item.id"
            class="flex-1"
            layout="position"
            as="li"
          >
            <UButton
              variant="ghost"
              color="neutral"
              class="w-full text-left truncate"
              @click="addToGroup(item)"
            >
              <UBadge
                :icon="isStop(item) ? 'i-lucide-map-pin' : 'i-lucide-bus-front'"
                :label="item.code"
              />

              <p>{{ item.name }}</p>
            </UButton>
          </Motion>
        </Motion>
      </AnimatePresence>
    </template>
  </USheet>
</template>
