<script setup lang="ts">
const props = defineProps<{ groupId: string }>()

const lineStore = useLineStore()

const { group, name } = useLineGroup(props.groupId)
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
          v-if="group && group.codes.length > 1"
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
