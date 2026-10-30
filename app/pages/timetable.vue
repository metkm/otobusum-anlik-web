<script setup lang="ts">
const lineStore = useLineStore()
</script>

<template>
  <div class="overflow-y-auto pb-2 mb-(--navigation-inset) lg:mb-auto lg:pt-[calc(var(--navigation-inset)+var(--spacing)*2)]">
    <LineCards class="m-2" />

    <UCarousel
      v-if="lineStore.group?.codes"
      v-slot="{ item }"
      :items="lineStore.group?.codes"
      :ui="{
        item: `${lineStore.group.codes.length > 1 ? 'basis-[96%]' : 'basis-full'} ps-2 border-box max-w-lg`,
        container: '-ms-2',
        viewport: '[&.is-dragging]:select-none h-full px-2',
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
