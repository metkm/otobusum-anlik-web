<script setup lang="ts">
const props = defineProps<{
  doorNo: string
}>()

const { query } = useLineBusInfo(() => props.doorNo)
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2 p-2 [&>div>div>h4]:text-sm [&>div>div>h4]:font-medium [&>div>div>span,h4]:text-muted">
    <div>
      <div class="flex gap-1 items-center">
        <UIcon name="i-lucide-door-closed" />
        <h4>{{ t('doorNo') }}</h4>
      </div>

      <p>{{ doorNo }}</p>
    </div>

    <UQuery
      v-slot="{ data }"
      :query="query"
    >
      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-circle-user" />
          <h4>{{ t('operator') }}</h4>
        </div>

        <p>{{ data.operator }}</p>
      </div>

      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-bandage" />
          <h4>{{ t('plate') }}</h4>
        </div>

        <p>{{ data.plate }}</p>
      </div>

      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-gauge" />
          <h4>{{ t('speed') }}</h4>
        </div>

        <p>{{ data.speed }} km/h</p>
      </div>
    </UQuery>
  </div>
</template>
