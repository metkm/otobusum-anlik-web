<script lang="ts">
export interface LineRootContext {
  code: MaybeRefOrGetter<string>
}

export const [injectLineContext, provideLineContext] = createContext<LineRootContext>('Line')
</script>

<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

provideLineContext({
  code: computed(() => props.code),
})
</script>

<template>
  <slot />
</template>
