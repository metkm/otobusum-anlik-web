<script setup lang="ts">
import type { ArrayOrNested, DropdownMenuItem } from '@nuxt/ui'

const props = withDefaults(
  defineProps<{
    items?: ArrayOrNested<DropdownMenuItem>
  }>(),
  {
    items: () => [],
  },
)

const lineStore = useLineStore()
const { code } = useLine()
const { t } = useI18n()

const dropdownOpen = ref(false)

const items = computed(() => ([
  {
    label: t('addToGroup'),
    icon: 'i-lucide-circle-plus',
    children: [
      lineStore.groups.map(group => ({
        label: group.name,
        slot: 'group-item',
        value: group,
        onSelect: (event) => {
          lineStore.addLine(toValue(code), group.id)
          event.preventDefault()
        },
      } satisfies DropdownMenuItem)),
      [
        {
          label: t('newGroup'),
          icon: 'i-lucide-plus-circle',
          onSelect: (event) => {
            lineStore.createGroup()
            event.preventDefault()
          },
        } satisfies DropdownMenuItem,
      ],
    ],
  },
  ...props.items,
] as ArrayOrNested<DropdownMenuItem>))
</script>

<template>
  <UDropdownMenu
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
  </UDropdownMenu>

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
