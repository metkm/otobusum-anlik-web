<script setup lang="ts">
import { motion } from 'motion-v'
import { slideFadeDownUp } from '~/constants/motion'

definePageMeta({
  label: 'edit',
})

const route = useRoute('sheet-group-groupId')
const lineStore = useLineStore()

const groupId = route.params.groupId
const name = ref(lineStore.group?.name || '')

watchDebounced(name, () => {
  if (!lineStore.group)
    return
  lineStore.group.name = name.value
}, { debounce: 500 })

const deleteGroup = () => {
  navigateTo('/')
  lineStore.deleteGroup(groupId)
}
</script>

<template>
  <div class="flex flex-col gap-2 p-2 max-w-lg">
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
        <motion.ol
          class="flex flex-wrap gap-2"
          layout
        >
          <AnimatePresence>
            <motion.li
              v-for="code in lineStore.group!.codes"
              :key="code"
              layout
              v-bind="slideFadeDownUp"
            >
              <UButton
                :label="code"
                variant="soft"
                color="neutral"
                trailing-icon="i-lucide-trash-2"
                @click="lineStore.deleteLine(code, groupId)"
              />
            </motion.li>
          </AnimatePresence>
        </motion.ol>
      </LayoutGroup>
    </UFormField>

    <UButton
      v-if="lineStore.groups.length > 1"
      :label="$t('deleteGroup')"
      variant="subtle"
      color="error"
      icon="i-lucide-trash-2"
      class="ml-auto"
      @click="deleteGroup"
    />
  </div>
</template>
