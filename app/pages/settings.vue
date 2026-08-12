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

    <div class="flex items-center gap-2">
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

      <UButton
        to="https://www.reddit.com/r/transitTurkey/comments/1gv1ppd/otob%C3%BCs%C3%BCm_nerede_alternatifi_bir_uygulama/"
        icon="i-mdi-reddit"
        variant="link"
        color="neutral"
        target="_blank"
        size="xl"
      />

      <UButton
        to="https://github.com/metkm/otobusum-anlik-web"
        icon="i-mdi-github"
        variant="link"
        color="neutral"
        target="_blank"
        size="xl"
      />
    </div>
  </div>
</template>
