<script setup lang="ts">
const lineStore = useLineStore()
</script>

<template>
  <Motion
    layout="position"
    class="flex flex-col items-start gap-2 shrink-0 pointer-events-none *:pointer-events-auto"
  >
    <OverlaySearch />

    <UButton
      icon="i-lucide-repeat"
      color="neutral"
      variant="subtle"
      size="lg"
      @click="() => lineStore.group?.codes.forEach(c => lineStore.changeRouteDirection(c))"
    />

    <LineGroups>
      <UButton
        icon="i-lucide-component"
        color="neutral"
        variant="subtle"
        size="lg"
        :label="lineStore.group?.name"
      />
    </LineGroups>
  </Motion>
</template>
