<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ title: string, icon: string, to?: RouteLocationRaw }>()

const navigationBar = useTemplateRef('navigation')
const { height } = useElementSize(navigationBar, undefined, { box: 'border-box' })

const route = useRoute()
</script>

<template>
  <div
    class="flex flex-col h-full w-full max-w-full max-h-full overflow-hidden"
    :style="{ '--navigation-inset': `${height}px` }"
  >
    <DefineTemplate v-slot="{ title, icon, to }">
      <UButton
        :label="title"
        :icon="icon"
        color="neutral"
        size="lg"
        class="grow backdrop-blur-lg"
        block
        :to="to"
        :variant="route.path === to ? 'solid' : 'subtle'"
      />
    </DefineTemplate>

    <div
      ref="navigation"
      class="absolute inset-x-0 bottom-0 lg:top-0 lg:bottom-auto flex gap-2 p-2 max-w-lg z-50"
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

      <USheet>
        <ReuseTemplate
          :title="$t('settings')"
          icon="i-lucide-cog"
        />

        <template #content>
          <AppSettings />
        </template>
      </USheet>
    </div>

    <AppMapRoot>
      <NuxtPage />
    </AppMapRoot>
  </div>
</template>
