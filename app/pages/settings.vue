<script setup lang="ts">
definePageMeta({
  icon: 'i-lucide-settings',
  label: 'settings',
})

const settingsStore = useSettingsStore()
const lineStore = useLineStore()
const colorMode = useColorMode()
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <USwitch
      v-model="settingsStore.hideMap"
      :label="$t('hideMap')"
    />

    <USwitch
      v-model="settingsStore.showTraffic"
      :label="$t('showTraffic')"
    />

    <UFormField
      :label="$t('city')"
      orientation="horizontal"
    >
      <USelect
        v-model="lineStore.city"
        :items="Object.keys(lineStore.linesByCity)"
      />
    </UFormField>

    <UFormField
      :label="$t('appTheme')"
      orientation="horizontal"
    >
      <USelect
        v-model="colorMode.preference"
        :items="[
          { label: $t('dark'), value: 'dark' },
          { label: $t('light'), value: 'light' },
          { label: $t('system'), value: 'system' },
        ]"
      />
    </UFormField>

    <div class="flex itemsc-center gap-2">
      <UButton
        :label="$t('license', { city: 'istanbul' })"
        to="https://data.ibb.gov.tr/license"
        variant="link"
        color="neutral"
        target="_blank"
      />

      <UButton
        :label="$t('license', { city: 'izmir' })"
        to="https://acikveri.bizizmir.com/tr/license"
        variant="link"
        color="neutral"
        target="_blank"
      />
    </div>
  </div>
</template>
