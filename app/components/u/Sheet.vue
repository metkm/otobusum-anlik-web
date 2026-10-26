<script setup lang="ts">
import type { DrawerContentEmits, DrawerContentProps } from 'reka-ui'
import { DrawerContent, DrawerHandle, DrawerOverlay, DrawerPortal, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<DrawerContentProps>()
const emits = defineEmits<DrawerContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot>
    <DrawerTrigger>
      <slot />
    </DrawerTrigger>

    <DrawerPortal>
      <DrawerOverlay class="DrawerOverlay fixed inset-0 z-30 bg-black/40" />

      <LayoutGroup>
        <DrawerContent
          class="DrawerContent fixed inset-x-0 max-h-full bottom-0 z-100 mx-auto flex max-w-2xl flex-col outline-none [--bleed:48px] -mb-(--bleed) pb-[calc(env(safe-area-inset-bottom,0px)+var(--bleed))]"
          v-bind="forwarded"
        >
          <Motion
            layout
            class="bg-default rounded-t-md"
          >
            <DrawerHandle class="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
            <slot name="content" />
          </Motion>
        </DrawerContent>
      </LayoutGroup>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style>
.DrawerOverlay[data-state="open"] {
  animation: drawer-overlay-in 450ms cubic-bezier(0.32, 0.72, 0, 1);
}
.DrawerOverlay[data-state="closed"] {
  animation: drawer-overlay-out 450ms cubic-bezier(0.32, 0.72, 0, 1);
}

.DrawerContent {
  transform: translateY(var(--drawer-swipe-movement-y, 0px));
  /* transition: transform 450ms cubic-bezier(0.32, 0.72, 0, 1); */
  will-change: transform;
}
.DrawerContent[data-state="open"] {
  animation: drawer-slide-bottom-in 450ms cubic-bezier(0.32, 0.72, 0, 1);
}
.DrawerContent[data-state="closed"] {
  animation: drawer-slide-bottom-out 450ms cubic-bezier(0.32, 0.72, 0, 1);
}
.DrawerContent[data-swiping] {
  transition-duration: 0ms;
  user-select: none;
}

@keyframes drawer-overlay-in { from { opacity: 0; } }
@keyframes drawer-overlay-out { to { opacity: 0; } }
@keyframes drawer-slide-bottom-in { from { translate: 0 calc(100% - var(--bleed)); } }
@keyframes drawer-slide-bottom-out { to { translate: 0 calc(100% - var(--bleed)); } }
</style>
