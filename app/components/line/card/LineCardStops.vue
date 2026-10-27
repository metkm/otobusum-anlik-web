<script setup lang="ts">
const { query } = useLineStops()

const closestBus: undefined | boolean = true
</script>

<template>
  <UQuery
    v-slot="{ data }"
    :query="query"
  >
    <ol class="flex flex-col gap-2 py-2 max-h-96 overflow-y-auto w-full">
      <li
        v-for="(stop, index) in data"
        :key="stop.id"
        class="flex flex-col"
      >
        <USheet>
          <UButton
            variant="ghost"
            class="w-full"
            trailing-icon="i-lucide-chevron-right"
            :ui="{ trailingIcon: 'ml-auto' }"
          >
            <p class="w-6.5 font-medium text-muted text-center">
              {{ index + 1 }}
            </p>

            <div class="mx-1 outline-2 outline-offset-2 rounded-full size-7 flex items-center justify-center">
              <UIcon
                :name="closestBus ? 'i-lucide-bus-front' : 'i-lucide-map-pin'"
                class="size-4"
              />
            </div>

            <div class="text-left">
              <p class="text-default">
                {{ stop.name }}
              </p>

              <p class="text-xs text-muted">
                bus is close to this stop
              </p>
            </div>
          </UButton>

          <template #content>
            <StopInfo :code="stop.code" />
          </template>
        </USheet>
      </li>
    </ol>
  </UQuery>
</template>
