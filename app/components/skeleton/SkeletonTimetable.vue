<template>
  <div class="flex gap-2 p-2">
    <div class="flex flex-col gap-2 w-8">
      <div
        v-for="i in 10"
        :key="i"
        class="h-8 w-full animate-pulse shrink-0 bg-black/50 rounded-md"
      />
    </div>

    <div class="flex flex-col gap-2 grow">
      <div
        v-for="i in 10"
        :key="i"
        class="h-8 w-full animate-pulse shrink-0 bg-black/50 rounded-md"
      />
    </div>
  </div>
</template>
