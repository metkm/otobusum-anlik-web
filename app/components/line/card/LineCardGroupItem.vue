<script setup lang="ts">
import type { LineGroup } from '~/types/line'

const props = defineProps<{ group: LineGroup }>()

const lineStore = useLineStore()

const selected = computed(() => lineStore.group?.id === props.group.id)

const goToEdit = (event: MouseEvent) => {
  event.preventDefault()
  event.stopImmediatePropagation()
  navigateTo({
    name: 'sheet-group-groupId',
    params: {
      groupId: props.group.id,
    },
  })
}

const deleteGroup = (event: MouseEvent) => {
  event.preventDefault()
  event.stopImmediatePropagation()
  lineStore.deleteGroup(props.group.id)
}
</script>

<template>
  <div class="flex items-center p-1 gap-2 grow overflow-hidden">
    <div
      class="flex items-center justify-center size-6 shrink-0 p-1 rounded-md bg-muted"
      :class="{ 'bg-primary': selected }"
    >
      <UIcon
        v-if="selected"
        name="i-lucide-check"
        class="text-inverted h-full w-full"
      />
    </div>

    <div class="text-start w-full min-w-0">
      <p class="truncate overflow-hidden mb-1">
        {{ group.name }}
      </p>

      <ol
        v-if="group?.codes && group.codes.length > 0"
        class="text-muted flex flex-wrap gap-1"
      >
        <li
          v-for="code in group.codes"
          :key="code"
        >
          <p class="text-xs px-2 py-1 bg-elevated rounded-md">
            {{ code }}
          </p>
        </li>
      </ol>
      <p
        v-else
        class="text-muted text-xs"
      >
        {{ $t('emptyGroup') }}
      </p>
    </div>

    <UButton
      icon="i-lucide-edit-3"
      variant="ghost"
      color="neutral"
      size="sm"
      class="w-max"
      @click="goToEdit"
    />

    <UButton
      v-if="lineStore.groups.length > 1"
      icon="i-lucide-trash-2"
      color="error"
      variant="soft"
      size="sm"
      @click="deleteGroup"
    />
  </div>
</template>
