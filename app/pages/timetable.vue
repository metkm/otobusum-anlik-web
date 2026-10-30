<script setup lang="ts">
const lineStore = useLineStore()
</script>

<template>
  <div class="overflow-y-auto pt-2 lg:pt-(--navigation-inset) pb-(--navigation-inset) lg:pb-2">
    <LineCards class="m-2 mt-0" />

    <!-- v-if="(lineStore.group?.codes.length || 0) > 0" -->
    <UCarousel
      v-if="lineStore.group?.codes"
      v-slot="{ item }"
      :items="lineStore.group?.codes"
      :ui="{
        item: `${lineStore.group.codes.length > 1 ? 'basis-[96%]' : 'basis-full'} ps-2 border-box max-w-lg`,
        container: '-ms-2 mr-2 px-2',
        viewport: '[&.is-dragging]:select-none h-full',
      }"
      :class-names="{
        draggable: 'dragging',
      }"
      :active="lineStore.group.codes.length > 1"
    >
      <LineContext :code="item">
        <ThemeProvider>
          <LineTimetable class="h-full" />
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
