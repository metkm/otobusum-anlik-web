<script setup lang="ts">
import type { DrawerRootEmits, DrawerRootProps } from 'reka-ui'
import { DrawerContent, DrawerHandle, DrawerOverlay, DrawerPortal, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<DrawerRootProps>()
const emits = defineEmits<DrawerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot v-bind="forwarded">
    <DrawerVirtualKeyboardProvider>
      <DrawerTrigger class="flex flex-1 min-w-0">
        <slot />
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay class="DrawerOverlay fixed inset-0 bg-black/40" />

        <DrawerViewport>
          <LayoutGroup>
            <DrawerContent class="DrawerContent fixed inset-x-0 flex flex-col max-h-full bottom-0 z-100 mx-auto max-w-2xl [--bleed:48px] -mb-(--bleed) pb-[calc(env(safe-area-inset-bottom,0px)+var(--bleed))]">
              <Motion
                layout="position"
                class="flex flex-col grow overflow-hidden p-px pb-0 bg-accented"
                :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }"
              >
                <Motion
                  layout="position"
                  class="flex flex-col bg-default h-full max-h-full overflow-hidden pb-(--drawer-keyboard-inset)"
                  :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }"
                >
                  <Motion layout="position">
                    <DrawerHandle class="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
                  </Motion>

                  <slot name="content" />
                </Motion>
              </Motion>
            </DrawerContent>
          </LayoutGroup>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerVirtualKeyboardProvider>
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
  transition: transform, padding-bottom 450ms cubic-bezier(0.32, 0.72, 0, 1);
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
