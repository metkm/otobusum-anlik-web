<script setup lang="ts">
const lineStore = useLineStore()
</script>

<template>
  <div class="overflow-y-auto pb-(--bottom-navigation-inset)">
    <UCarousel
      v-if="(lineStore.group?.codes.length || 0) > 0"
      v-slot="{ item }"
      :items="lineStore.group?.codes"
      :ui="{
        item: 'basis-[85%] md:basis-[65%] lg:basis-[55%] ps-2 border-box',
        container: '-ms-2 mr-2 p-2',
        viewport: '[&.is-dragging]:select-none h-full',
      }"
      :class-names="{
        draggable: 'dragging',
      }"
    >
      <LineContext :code="item">
        <ThemeProvider>
          <LineTimetable class="h-full max-w-2xl" />
        </ThemeProvider>
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
