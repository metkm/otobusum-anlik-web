<script setup lang="ts">
</script>

<template>
  <!-- class="flex flex-col fixed inset-0 top-page-top left-page-left right-page-right bottom-page-bottom pointer-events-none *:pointer-events-auto" -->
  <div class="fixed flex flex-col justify-between inset-0 pt-safe-top pb-safe-bottom px-2 pointer-events-none *:pointer-events-auto">
    <slot />
  </div>
</template>
