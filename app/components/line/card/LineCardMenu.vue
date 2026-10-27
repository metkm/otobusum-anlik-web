<script setup lang="ts">
// import type { ArrayOrNested, DropdownMenuItem } from '@nuxt/ui'

// const props = withDefaults(
//   defineProps<{
//     items?: ArrayOrNested<DropdownMenuItem>
//   }>(),
//   {
//     items: () => [],
//   },
// )

const lineStore = useLineStore()
const { code } = useLine()
// const { t } = useI18n()

// const dropdownOpen = ref(false)

// const items = computed(() => ([
//   {
//     label: t('addToGroup'),
//     icon: 'i-lucide-circle-plus',
//     children: [
//       lineStore.groups.map(group => ({
//         label: group.name,
//         slot: 'group-item',
//         value: group,
//         onSelect: (event) => {
//           lineStore.addLine(toValue(code), group.id)
//           event.preventDefault()
//         },
//       } satisfies DropdownMenuItem)),
//       [
//         {
//           label: t('newGroup'),
//           icon: 'i-lucide-plus-circle',
//           onSelect: (event) => {
//             lineStore.createGroup()
//             event.preventDefault()
//           },
//         } satisfies DropdownMenuItem,
//       ],
//     ],
//   },
//   ...props.items,
// ] as ArrayOrNested<DropdownMenuItem>))
</script>

<template>
  <USheet>
    <UButton
      icon="i-lucide-menu"
      variant="ghost"
      color="neutral"
    />

    <template #content>
      <ThemeProvider>
        <div class="flex flex-col gap-2 p-2">
          <USheet>
            <UButton
              variant="soft"
              :label="$t('addToGroup')"
              icon="i-lucide-plus-circle"
              size="lg"
              square
              class="w-full"
              block
            />

            <template #content>
              <LineGroups :code="toValue(code)" />
            </template>
          </USheet>

          <UButton
            :label="$t('deleteLine')"
            variant="soft"
            icon="i-lucide-trash"
            square
            size="lg"
            block
            color="error"
            @click="lineStore.deleteLine(toValue(code))"
          />
        </div>
      </ThemeProvider>
    </template>
  </USheet>

  <!-- <UDropdownMenu
    v-model:open="dropdownOpen"
    :items="items"
  >
    <UButton
      icon="i-lucide-menu"
      variant="ghost"
      color="neutral"
      size="sm"
    />

    <template #group-item="{ item }: { item: DropdownMenuItem }">
      <LineCardGroupItem :group="item.value" />
    </template>
  </UDropdownMenu> -->

  <!-- <UDrawer
    v-else
    v-model:open="drawerOpen"
    :set-background-color-on-scale="false"
    should-scale-background
  >
    <UButton
      icon="i-lucide-menu"
      variant="ghost"
      color="neutral"
    />

    <template #content>
      <div class="flex flex-col gap-2">
        <template
          v-for="item in items.flat()"
          :key="item.label"
        >
          <UButton
            v-if="item.label"
            :color="item.color ?? 'neutral'"
            :icon="item.icon"
            square
            block
            size="lg"
            class="py-4"
            variant="soft"
            @click="item.onSelect"
          >
            {{ item.label }}
          </UButton>
        </template>
      </div>
    </template>
  </UDrawer> -->
</template>
