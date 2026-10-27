<script setup lang="ts">
defineProps<{ code: string }>()

const lineStore = useLineStore()
</script>

<template>
  <ThemeProvider :code="code">
    <ol class="p-2">
      <li
        v-for="group in lineStore.groups"
        :key="group.id"
        class="w-full"
      >
        <UButton
          variant="ghost"
          color="neutral"
          class="w-full"
          @click="lineStore.addLine(code, group.id)"
        >
          <div class="flex flex-col items-start gap-2">
            <p>{{ group.name }}</p>

            <ol class="flex flex-wrap items-center gap-1">
              <li
                v-for="c in group.codes"
                :key="c"
              >
                <UBadge
                  :label="c"
                  :color="code === c ? 'primary' : 'neutral'"
                  variant="soft"
                />
              </li>
            </ol>
          </div>
        </UButton>
      </li>
    </ol>
  </ThemeProvider>
</template>
