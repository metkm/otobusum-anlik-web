<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ title: string, icon: string, to?: RouteLocationRaw }>()

const navigationBar = useTemplateRef('navigation')
const { height } = useElementSize(navigationBar, undefined, { box: 'border-box' })

const route = useRoute()
</script>

<template>
  <div class="flex flex-col flex-1">
    <AppMapRoot>
      <NuxtPage :style="{ '--bottom-navigation-inset': `${height}px` }" />
    </AppMapRoot>

    <DefineTemplate v-slot="{ title, icon, to }">
      <UButton
        :label="title"
        :icon="icon"
        size="lg"
        class="grow backdrop-blur-lg"
        block
        :to="to"
        :variant="route.path === to ? 'solid' : 'subtle'"
      />
    </DefineTemplate>

    <div
      ref="navigation"
      class="absolute inset-x-0 bottom-0 flex gap-2 p-2"
    >
      <ReuseTemplate
        :title="$t('map')"
        icon="i-lucide-map"
        to="/"
      />

      <ReuseTemplate
        :title="$t('timetable')"
        icon="i-lucide-clock"
        to="/timetable"
      />

      <ReuseTemplate
        :title="$t('settings')"
        icon="i-lucide-cog"
        to="/settings"
      />
    </div>
  </div>
</template>
