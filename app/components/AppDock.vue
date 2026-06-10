<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { exitFade, slideFadeDownUp } from '~/constants/motion'
import type { BusLine, BusStop } from '~/types/bus'

const query = ref('')

const input = useTemplateRef('search')

const { query: { data, error, isFetching } } = useSearch(query)
const { t } = useI18n()
const lineStore = useLineStore()
const router = useRouter()

const formatItems = (items?: (BusStop | BusLine)[]) => {
  if (!items)
    return []

  return items.map(item => ({
    label: item.name,
    value: item,
    onSelect: (event) => { event.preventDefault() },
  }) satisfies DropdownMenuItem)
}

const searchItems = computed(() => [
  ...formatItems(data.value?.lines),
  ...formatItems(data.value?.stops),
])

const groupItems = computed(
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
  <LayoutGroup>
    <UTheme
      :props="{
        button: { variant: 'subtle', color: 'neutral', size: 'lg' },
        inputMenu: { size: 'lg', variant: 'subtle' },
      }"
    >
      <Motion
        layout
        class="flex flex-col p-2 gap-2 bg-default/90 backdrop-blur-md rounded-md ring ring-muted shadow shadow-black/25 max-w-full mx-auto"
      >
        <Motion
          layout
          class="flex flex-wrap-reverse items-center gap-2"
        >
          <Motion class="flex items-center gap-2 min-w-0">
            <Motion layout="position">
              <ol class="flex items-center gap-2">
                <li
                  v-for="_route in routes"
                  :key="_route.path"
                  class="shrink-0"
                >
                  <UButton
                    :to="_route.path"
                    :icon="_route.meta!.icon"
                    class="pointer-events-auto"
                  />
                </li>
              </ol>
            </Motion>

            <Motion
              v-if="lineStore.group?.codes && lineStore.group.codes.length > 0"
              layout="position"
            >
              <UButton
                icon="i-lucide-repeat"
                @click="() => lineStore.group?.codes.forEach(c => lineStore.changeRouteDirection(c))"
              />
            </Motion>

            <UDropdownMenu
              :items="groupItems"
              :ui="{ item: 'items-stretch gap-2', content: 'overflow-hidden' }"
              :content="{ side: 'top' }"
            >
              <Motion
                layout
                class="bg-(--ui-border-accented) p-px min-w-0"
                :style="{ borderRadius: '12px' }"
              >
                <Motion
                  layout
                  class="bg-elevated flex items-center gap-1.5 py-1.75 px-2.75 select-none hover:bg-accented/75 overflow-hidden"
                  :style="{ borderRadius: '12px' }"
                >
                  <Motion
                    layout="position"
                    as-child
                  >
                    <UIcon
                      name="i-lucide-component"
                      class="size-5 shrink-0"
                    />
                  </Motion>

                  <AnimatePresence
                    v-if="lineStore.group?.name"
                    mode="wait"
                  >
                    <Motion
                      :key="lineStore.group?.name"
                      v-bind="slideFadeDownUp"
                      as-child
                      layout-id="group-name"
                      layout="position"
                    >
                      <p class="truncate text-sm font-medium">
                        {{ lineStore.group?.name }}
                      </p>
                    </Motion>
                  </AnimatePresence>
                </Motion>
              </Motion>

              <template #group-item="{ item }: { item: DropdownMenuItem }">
                <LineCardGroupItem :group="item.value" />
              </template>
            </UDropdownMenu>
          </Motion>

          <Motion
            layout="position"
            class="grow"
          >
            <UInputMenu
              ref="search"
              v-model:search-term="query"
              :items="searchItems"
              :placeholder="$t('searchPlaceholder')"
              :loading="isFetching"
              ignore-filter
              :ui="{ item: 'p-0', content: 'w-fit max-w-(--reka-popper-available-width)' }"
              :highlight-on-hover="false"
              :reset-search-term-on-blur="false"
              open-on-click
              open-on-focus
              icon="i-lucide-search"
              class="w-full"
              clear
            >
              <template #item="{ item }: { item: { value: BusLine | BusStop } }">
                <LineContext :code="item.value.code.toString()">
                  <AppSearchItem :item="item.value" />
                </LineContext>
              </template>

              <template #empty>
                {{ $t('emptySearch') }}
              </template>

              <template
                v-if="query"
                #trailing
              >
                <UButton
                  icon="i-lucide-x"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  @click="() => {
                    if (!input)
                      return

                    query = ''
                  }"
                />
              </template>
            </UInputMenu>
          </Motion>
        </Motion>

        <AnimatePresence>
          <Motion
            v-if="error?.message"
            layout
            v-bind="exitFade"
          >
            <p class="text-center text-error text-sm font-medium">
              {{ error.message }}
            </p>
          </Motion>
        </AnimatePresence>
      </Motion>
    </UTheme>
  </LayoutGroup>
</template>
