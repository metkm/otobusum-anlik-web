<script setup lang="ts">
import { DrawerContent, DrawerHandle, DrawerOverlay, DrawerPortal } from 'reka-ui'

defineProps<{ title?: string, description?: string }>()
</script>

<template>
  <DrawerRoot>
    <DrawerVirtualKeyboardProvider>
      <DrawerTrigger as-child>
        <slot />
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay class="DrawerOverlay fixed inset-0 bg-black/40" />

        <DrawerViewport>
          <!-- <LayoutGroup> -->
          <DrawerContent
            class="DrawerContent fixed inset-x-0 flex flex-col max-h-full bottom-0 mx-auto max-w-2xl [--bleed:48px] -mb-(--bleed) pb-[calc(env(safe-area-inset-bottom,0px)+var(--bleed))] bg-default rounded-t-md border-t lg:border-x border-muted"
          >
            <DrawerHandle class="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted" />

            <!-- <div class="flex flex-col h-full grow max-h-full overflow-hidden max-w-full pb-(--drawer-keyboard-inset)"> -->
            <div class="flex flex-col w-full overflow-hidden max-h-full pb-(--drawer-keyboard-inset)">
              <slot name="content" />
            </div>

            <!-- <Motion
                layout
                class="flex flex-col grow overflow-hidden pt-px md:px-px pb-0 bg-accented"
                :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }"
              >
                <Motion
                  layout
                  class="flex flex-col bg-default h-full max-h-full overflow-hidden pb-(--drawer-keyboard-inset)"
                  :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }"
                >
                  <Motion layout="position">
                    <DrawerHandle class="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
                  </Motion>

                  <Motion
                    v-if="title || description || $slots.actions"
                    layout="position"
                    class="flex justify-between items-center p-2 border-b border-muted"
                  >
                    <div>
                      <DrawerTitle
                        v-if="title"
                        class="font-medium"
                      >
                        {{ title }}
                      </DrawerTitle>

                      <DrawerDescription
                        v-if="description"
                        class="text-sm text-muted font-medium"
                      >
                        {{ description }}
                      </DrawerDescription>
                    </div>

                    <slot name="actions" />
                  </Motion>

                  <slot name="content" />
                </Motion>
              </Motion> -->
          </DrawerContent>
          <!-- </LayoutGroup> -->
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
