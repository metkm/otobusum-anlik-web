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
      <ThemeProvider :code="code">
        <LayoutGroup>
          <Motion
            layout
            class="p-2"
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
                class="flex grow"
                @click="selectOrAdd(group.id)"
              >
                <div class="flex flex-col items-start gap-2 grow">
                  <p>{{ group.name }}</p>

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
                    class="text-muted"
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
