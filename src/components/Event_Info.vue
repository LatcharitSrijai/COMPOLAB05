<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-info">
    <p class="info-text">{{ event.category }}</p>
    <p class="info-text">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.event-info {
  text-align: right;  
  margin-bottom: 10px;
}

.info-text {
  font-size: 16px;    
  margin: 0;
}
</style>
