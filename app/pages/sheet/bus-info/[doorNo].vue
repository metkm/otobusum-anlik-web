<script setup lang="ts">
definePageMeta({
  label: 'busInfo',
})

const route = useRoute('sheet-bus-info-doorNo')
const doorNo = route.params.doorNo

const { query } = useLineBusInfo(doorNo)
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2 [&>div>div>h4]:text-sm [&>div>div>h4]:font-medium [&>div>div>span,h4]:text-muted">
    <div>
      <div class="flex gap-1 items-center">
        <UIcon name="i-lucide-door-closed" />
        <h4>{{ t('doorNo') }}</h4>
      </div>

      <p>{{ doorNo }}</p>
    </div>

    <LoadingSpinner v-if="query.isFetching.value" />
    <template v-else>
      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-circle-user" />
          <h4>{{ t('operator') }}</h4>
        </div>

        <p>{{ query.data.value?.operator }}</p>
      </div>

      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-bandage" />
          <h4>{{ t('plate') }}</h4>
        </div>

        <p>{{ query.data.value?.plate }}</p>
      </div>

      <div>
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-gauge" />
          <h4>{{ t('speed') }}</h4>
        </div>

        <p>{{ query.data.value?.speed }} km/h</p>
      </div>

      <div v-if="query.data.value?.garage">
        <div class="flex gap-1 items-center">
          <UIcon name="i-lucide-van" />
          <h4>{{ t('garage') }}</h4>
        </div>

        <p>{{ query.data.value?.garage }}</p>
      </div>
    </template>
  </div>
</template>
