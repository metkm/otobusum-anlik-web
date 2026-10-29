<script setup lang="ts" generic="T, E">
import type { UseQueryReturnType } from '@tanstack/vue-query'

const props = defineProps<{
  query: UseQueryReturnType<T, E>
}>()
</script>

<template>
  <Motion
    layout="position"
    as-child
  >
    <slot
      v-if="props.query.isFetching.value"
      name="fetching"
    >
      <ULoading />
    </slot>
    <slot
      v-else-if="props.query.isError.value"
      name="error"
    >
      <p>{{ props.query.error.value }}</p>
    </slot>
    <slot
      v-else-if="props.query.data.value"
      :data="props.query.data.value"
    />
  </Motion>
</template>
