<script setup lang="ts">
const { query } = useLineStops()
</script>

<template>
  <LineMarkerStop
    v-for="stop in query.data.value"
    :key="stop.id"
    :stop="stop"
  />
</template>
