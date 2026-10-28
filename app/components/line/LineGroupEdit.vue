<script setup lang="ts">
const props = defineProps<{ groupId: string }>()

const lineStore = useLineStore()

const groups = computed(() => lineStore.linesByCity[lineStore.city])
const groupId = computed(() => props.groupId ?? lineStore.groupId)
const group = computed(() => groups.value.find(gr => gr.id === groupId.value))

const name = computed({
  get() {
    return group.value?.name
  },
  set(newName: string) {
    const group = lineStore.linesByCity[lineStore.city].find(gr => gr.id === groupId.value)
    if (group) {
      group.name = newName
    }
  },
})
</script>

<template>
  <USheet>
    <slot />

    <template #content>
      <div class="flex flex-col gap-2 p-2">
        <UFormField :label="$t('name')">
          <UInput
            v-model="name"
            :placeholder="groupId"
            class="w-full"
          />
        </UFormField>

        <UFormField
          v-if="group?.codes && group?.codes.length > 0"
          :label="$t('lines')"
        >
          <LayoutGroup>
            <Motion
              class="flex flex-wrap gap-2"
              layout="position"
              as="ol"
            >
              <AnimatePresence>
                <Motion
                  v-for="code in group.codes"
                  :key="code"
                  layout="position"
                  as="li"
                >
                  <ThemeProvider :code="code">
                    <UButton
                      :label="code"
                      variant="soft"
                      trailing-icon="i-lucide-trash-2"
                      @click="lineStore.deleteLine(code, groupId)"
                    />
                  </ThemeProvider>
                </Motion>
              </AnimatePresence>
            </Motion>
          </LayoutGroup>
        </UFormField>

        <UButton
          :label="$t('deleteGroup')"
          variant="subtle"
          color="error"
          icon="i-lucide-trash-2"
          class="ml-auto"
          @click="lineStore.deleteGroup(groupId)"
        />
      </div>
    </template>
  </USheet>
</template>
