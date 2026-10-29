<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ title: string, icon: string, to?: RouteLocationRaw, anchor?: string }>()

const navigationBar = useTemplateRef('navigation')
const { height } = useElementSize(navigationBar, undefined, { box: 'border-box' })

const route = useRoute()
</script>

<template>
  <div
    class="flex flex-col h-full w-full max-w-full max-h-full overflow-hidden relative"
    :style="{ '--navigation-inset': `${height}px` }"
  >
    <DefineTemplate v-slot="{ title, icon, to, anchor }">
      <UButton
        :label="title"
        :icon="icon"
        color="neutral"
        variant="ghost"
        size="sm"
        class="grow flex-col gap-0.5 py-2"
        :ui="{ leadingIcon: 'size-5' }"
        block
        :to="to"
      >
        <template #leading>
          <UIcon
            :name="icon"
            class="size-5"
            :style="{ anchorName: anchor }"
          />
        </template>
      </UButton>
    </DefineTemplate>

    <div
      ref="navigation"
      class="absolute inset-x-0 bottom-0 max-w-5xl lg:max-w-md flex z-50 bg-default pb-safe lg:top-0 lg:bottom-auto lg:mt-2 lg:ml-2 lg:rounded-md lg:border lg:border-muted"
    >
      <div
        class="bg-accented px-5 rounded-full py-3 absolute left-0 top-0 Z-110 -translate-1/2 mb-2 transition-all"
        :style="{ positionAnchor: `--${route.name}`, left: 'anchor(center)', top: 'anchor(center)', width: 'anchor-size(width)', height: 'anchor-size(height)' }"
      />

      <ReuseTemplate
        :title="$t('map')"
        icon="i-lucide-map"
        to="/"
        anchor="--index"
      />

      <ReuseTemplate
        :title="$t('timetable')"
        icon="i-lucide-clock"
        to="/timetable"
        anchor="--timetable"
      />

      <USheet>
        <ReuseTemplate
          :title="$t('settings')"
          icon="i-lucide-cog"
          anchor="--settings"
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
