<script setup lang="ts">
const props = defineProps<{
  code: number
}>()

const { query } = useStop(() => props.code)
</script>

<template>
  <UQuery
    v-slot="{ data }"
    :query="query"
  >
    <Motion
      layout="position"
      class="flex flex-col gap-2 p-2"
    >
      <div>
        <p class="text-sm text-muted">
          {{ data.stop.code }}
        </p>
        <p class="font-medium">
          {{ data.stop.name }}
        </p>
        <p class="text-sm text-muted">
          {{ data.stop.province }}
        </p>
      </div>

      <div>
        <p class="text-muted text-sm">
          {{ $t('linesThatUseStop') }}
        </p>
        <ol class="flex flex-wrap items-center gap-2">
          <li
            v-for="line in data.buses"
            :key="line"
          >
            <USheet>
              <UButton
                :label="line"
                variant="soft"
              />

              <template #content>
                <LineGroups :code="line" />
              </template>
            </USheet>
          </li>
        </ol>
      </div>
    </Motion>
  </UQuery>
</template>
