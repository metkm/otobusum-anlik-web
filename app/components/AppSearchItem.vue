<script setup lang="ts">
import type { BusLine, BusStop } from '~/types/bus'

defineProps<{
  item: BusStop | BusLine
}>()

const lineStore = useLineStore()
const { cssVariableTemplate } = useLineTheme()
</script>

<template>
  <div class="flex items-center gap-2 grow overflow-hidden">
    <UButton
      variant="ghost"
      color="neutral"
      class="gap-2 grow truncate"
      square
      :style="cssVariableTemplate"
      @click="() => {
        if (isStop(item))
          return

        lineStore.addLine(item.code)
      }"
    >
      <template v-if="isStop(item)">
        <p>{{ item.name }}</p>
      </template>
      <LineContext
        v-else
        :code="item.code"
      >
        <p
          class="font-medium bg-muted rounded-md px-2.5 py-1"
          :class="{ 'bg-primary text-inverted': cssVariableTemplate }"
        >
          {{ item.code }}
        </p>

        <p class="text-start truncate">
          {{ item.name }}
        </p>
      </LineContext>
    </UButton>

    <LineCardMenu />
  </div>
</template>
