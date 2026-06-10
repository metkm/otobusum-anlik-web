<script setup lang="ts">
definePageMeta({
  icon: 'i-lucide-clock',
  label: 'timetable',
})

const lineStore = useLineStore()
</script>

<template>
  <div class="flex">
    <UCarousel
      v-if="(lineStore.group?.codes.length || 0) > 0"
      v-slot="{ item }"
      :items="lineStore.group?.codes"
      class="w-full"
      :ui="{
        item: 'basis-11/12 ps-2 h-full overflow-hidden',
        viewport: '[&.is-dragging]:select-none h-full',
        container: '-ml-2 h-full',
      }"
      :class-names="{
        draggable: 'dragging',
      }"
    >
      <LineContext :code="item">
        <LineTimetable class="h-full" />
      </LineContext>
    </UCarousel>
    <UEmpty
      v-else
      :title="$t('timetableEmpty')"
      variant="soft"
      class="m-2 grow"
    />
  </div>
</template>
