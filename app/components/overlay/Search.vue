<script setup lang="ts">
const search = ref('')

const { query } = useSearch(search)

const items = computed(
  () => (query.data.value && [...query.data.value.lines, ...query.data.value.stops]) ?? [],
)
</script>

<template>
  <USheet>
    <UButton
      icon="i-lucide-search"
      color="neutral"
      variant="subtle"
      size="lg"
    />

    <template #content>
      <div class="p-3">
        <Motion layout="position">
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
                class="flex-1 w-full"
              >
                <UBadge :label="item.code" />
                <p>{{ item.name }}</p>
              </UButton>
            </Motion>
          </Motion>
        </AnimatePresence>
      </div>
    </template>
  </USheet>
</template>
