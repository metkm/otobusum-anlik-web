<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 *:animate-pulse *:bg-black/50 *:rounded-md">
      <div class="h-4 w-9" />
      <div class="h-4 w-20" />
      <div class="h-4 w-9" />
    </div>

    <div>
      <div class="h-4 w-20 animate-pulse bg-black/50 rounded-md" />

      <div class="flex flex-wrap gap-2 mt-1 max-w-lg">
        <div
          v-for="i in 3"
          :key="i"
          class="h-7 w-14 px-2 py-1 animate-pulse bg-black/50 rounded-md"
        />
      </div>
    </div>
  </div>
</template>
