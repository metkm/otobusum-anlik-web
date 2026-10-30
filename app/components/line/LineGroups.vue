<script setup lang="ts">
const props = defineProps<{ code?: string }>()

const lineStore = useLineStore()

const selectOrAdd = (groupId: string) => {
  if (props.code) {
    lineStore.addLine(props.code, groupId)
  }
  else {
    lineStore.groupId = groupId
  }
}
</script>

<template>
  <USheet
    :title="$t('groups')"
    :description="props.code ? $t('addToGroup', { code }) : $t('chooseActiveGroup')"
  >
    <slot />

    <template #actions>
      <ThemeProvider>
        <UButton
          :label="$t('newGroup')"
          icon="i-lucide-plus-circle"
          variant="soft"
          @click="lineStore.createGroup()"
        />
      </ThemeProvider>
    </template>

    <template #content>
      <ThemeProvider
        :code="code"
        class="flex flex-col max-h-full overflow-hidden"
      >
        <LayoutGroup>
          <Motion
            layout
            class="p-2 overflow-y-auto"
            as="ol"
          >
            <Motion
              v-for="group in lineStore.groups"
              :key="group.id"
              layout="position"
              class="flex w-full max-w-full overflow-hidden gap-2"
              as="li"
            >
              <UButton
                variant="ghost"
                color="neutral"
                class="min-w-0 basis-0 grow gap-2"
                @click="selectOrAdd(group.id)"
              >
                <div
                  class="flex justify-center items-center size-8 shrink-0 rounded-md transition-colors"
                  :class="[group.id === lineStore.groupId ? 'bg-primary' : 'bg-accented']"
                >
                  <UIcon
                    v-if="group.id === lineStore.groupId"
                    name="i-lucide-check"
                    class="text-inverted size-5"
                  />
                </div>

                <div class="text-left flex flex-col gap-1 min-w-0 max-w-full">
                  <p class="truncate min-w-0">
                    {{ group.name }}
                  </p>

                  <ol
                    v-if="group.codes.length > 0"
                    class="flex flex-wrap items-center gap-1"
                  >
                    <li
                      v-for="c in group.codes"
                      :key="c"
                    >
                      <ThemeProvider :code="c">
                        <UBadge
                          :label="c"
                          :color="code === c ? 'primary' : 'neutral'"
                          variant="soft"
                        />
                      </ThemeProvider>
                    </li>
                  </ol>
                  <p
                    v-else
                    class="text-muted text-sm"
                  >
                    {{ $t('emptyGroup') }}
                  </p>
                </div>
              </UButton>

              <UButton
                v-if="lineStore.groups.length > 1"
                icon="i-lucide-trash"
                variant="ghost"
                color="neutral"
                @click="lineStore.deleteGroup(group.id)"
              />

              <LineGroupEdit :group-id="group.id">
                <UButton
                  icon="i-lucide-edit"
                  variant="ghost"
                  color="neutral"
                />
              </LineGroupEdit>
            </Motion>
          </Motion>
        </LayoutGroup>
      </ThemeProvider>
    </template>
  </USheet>
</template>
