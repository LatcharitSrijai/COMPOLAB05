<script setup lang="ts">
import EventCard from '@/components/EventCard.vue';
import EventInfo from '@/components/Event_Info.vue'

import type { Event } from '@/types.ts'
import { ref, onMounted } from 'vue'
import EventServices from '@/services/EventServices'

const events = ref<Event[]>([])

onMounted(() => {
  EventServices.getEvents()
  .then(response => {
    events.value = response.data
  })
    .catch(error => {
      console.error('There was an error!', error)
    })
})

</script>

<template>
  <h1>Events For Good</h1>
    <!-- new element -->
 <div class="events">
<EventCard v-for="event in events" :key="event.id" :event="event" />
<EventInfo v-for="event in events" :key="'info-' + event.id" :event="event" />
<p>652115042 Latcharit 8.7</p>
  </div>
</template>
<style scoped>
.events
{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>