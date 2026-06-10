<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { slideFadeDownUp } from '~/constants/motion'

const lineStore = useLineStore()
const router = useRouter()
const { t } = useI18n()

const items = computed(
  () => [
    lineStore.groups.map(group => ({
      id: group.id,
      label: group.name,
      codes: group.codes,
      slot: 'group-item',
      value: group,
      onSelect: () => {
        lineStore.groupId = group.id
      },
    })),
    [
      {
        label: t('newGroup') as string,
        icon: 'i-lucide-plus-circle',
        onSelect: (event) => {
          event.preventDefault()
          lineStore.createGroup()
        },
      },
    ] as DropdownMenuItem[],
  ],
)

const routes = router.options.routes
  .toReversed()
  .filter(r => r.meta?.icon)
</script>

<template>
  <Motion
    layout
    class="flex flex-col justify-between items-start grow p-2"
  >
    <Motion
      layout="position"
      class="w-full max-w-lg flex items-start gap-2"
    >
      <ol class="flex flex-col gap-2">
        <li
          v-for="_route in routes"
          :key="_route.path"
          class="shrink-0"
        >
          <UButton
            :to="_route.path"
            :icon="_route.meta!.icon"
            square
            size="xl"
            variant="subtle"
            color="neutral"
            class="bg-default pointer-events-auto"
          />
        </li>
      </ol>

      <AppSearch class="pointer-events-auto w-full" />
    </Motion>

    <div class="flex flex-col items-start gap-2">
      <UButton
        icon="i-lucide-repeat"
        color="neutral"
        variant="subtle"
        class="pointer-events-auto bg-default"
        size="xl"
        @click="() => lineStore.group?.codes.forEach(c => lineStore.changeRouteDirection(c))"
      />

      <UDropdownMenu
        :items="items"
        :ui="{ item: 'items-stretch gap-2', content: 'overflow-hidden' }"
        :content="{ side: 'top' }"
      >
        <UButton
          icon="i-lucide-component"
          color="neutral"
          variant="subtle"
          size="xl"
          class="pointer-events-auto max-w-full bg-default overflow-hidden"
          square
        >
          <AnimatePresence
            v-if="lineStore.group?.name"
            mode="wait"
          >
            <Motion
              :key="lineStore.group?.name"
              v-bind="slideFadeDownUp"
              as-child
            >
              <p class="truncate">
                {{ lineStore.group?.name }}
              </p>
            </Motion>
          </AnimatePresence>
        </UButton>

        <template #group-item="{ item }: { item: DropdownMenuItem }">
          <LineCardGroupItem :group="item.value" />
        </template>
      </UDropdownMenu>
    </div>
  </Motion>
</template>
