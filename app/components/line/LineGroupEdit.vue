<script setup lang="ts">
defineProps<{ groupId: string }>()

const lineStore = useLineStore()

const name = ref(lineStore.group?.name || '')

watchDebounced(name, () => {
  if (!lineStore.group)
    return
  lineStore.group.name = name.value
}, { debounce: 500 })
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
          v-if="lineStore.group?.codes && lineStore.group.codes.length > 0"
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
                  v-for="code in lineStore.group!.codes"
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
          v-if="lineStore.groups.length > 1"
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
