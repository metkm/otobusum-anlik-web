<script setup lang="ts">
const lineStore = useLineStore()

const { buses } = useLineBuses()
const { code } = useLine()
</script>

<template>
  <Motion
    layout="position"
    class="flex flex-col bg-default ring ring-inset ring-muted overflow-hidden"
    :style="{ borderRadius: '12px' }"
    as="div"
  >
    <LineCardName />
    <LineCardStops class="grow" />

    <div class="flex items-center gap-2 p-2 border-t border-t-muted shrink-0 max-w-full overflow-hidden">
      <UBadge
        icon="i-lucide-bus-front"
        :label="buses.length"
        variant="soft"
      />

      <UButton
        icon="i-lucide-repeat"
        variant="soft"
        @click="lineStore.changeRouteDirection(toValue(code))"
      />

      <LineCardRoutes />
    </div>
  </Motion>
</template>
